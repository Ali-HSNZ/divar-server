const autoBind = require('auto-bind')
const OptionModel = require('./option.model')
const CategoryModel = require('../category/category.model')
const createHttpError = require('http-errors')
const OptionMessages = require('./option.message')
const slugify = require('slugify')
const { Types } = require('mongoose')
const { isTrue, isFalse } = require('../../common/utils/functions')

class OptionService {
    #categoryModel
    #model
    constructor() {
        autoBind(this)
        this.#categoryModel = CategoryModel
        this.#model = OptionModel
    }
    async create(optionDto) {
        const category = await this.checkExistByCategoryId(optionDto.category)
        optionDto.category = category._id
        optionDto.key = slugify(optionDto.key, { trim: true, replacement: '_', lower: true })

        await this.alreadyExistByCategoryAndKey(optionDto.key, category._id)

        if (optionDto?.enum && typeof optionDto.enum === 'string') {
            optionDto.enum = optionDto.enum.split(',')
        } else if (!Array.isArray(optionDto.enum)) {
            optionDto.enum = []
        }

        if (optionDto?.required && isTrue(optionDto.required)) optionDto.required = true
        if (optionDto?.required && isFalse(optionDto.required)) optionDto.required = false

        const option = await this.#model.create(optionDto)
        return option
    }

    async checkExistByCategoryId(id) {
        const category = await this.#categoryModel.findById(id)
        if (!category) {
            throw new createHttpError.NotFound(OptionMessages.NotFound)
        }
        return category
    }

    async checkExistByOptionId(id) {
        const option = await this.#model.findById(id)
        if (!option) {
            throw new createHttpError.NotFound(OptionMessages.NotFound)
        }
        return option
    }
    async alreadyExistByCategoryAndKey(key, category) {
        const isExist = await this.#model.findOne({ category, key })
        if (isExist) {
            throw new createHttpError.Conflict(OptionMessages.AlreadyExist)
        }
        return null
    }

    async findById(id) {
        return await this.checkExistByOptionId(id)
    }

    async removeById(id) {
        await this.checkExistByOptionId(id)
        return await this.#model.deleteOne({ _id: id })
    }

    async findByCategoryId(categoryId) {
        return await this.#model.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
            {
                $addFields: {
                    categoryId: '$category._id',
                    categoryName: '$category.name',
                    categorySlug: '$category.slug',
                    categoryIcon: '$category.icon',
                },
            },
            {
                $match: {
                    categoryId: new Types.ObjectId(categoryId),
                },
            },
            {
                $project: {
                    __v: 0,
                    category: 0,
                    categoryId: 0,
                },
            },
        ])
    }

    async findByCategorySlug(categorySlug) {
        return await this.#model.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
            {
                $addFields: {
                    categoryName: '$category.name',
                    categorySlug: '$category.slug',
                    categoryIcon: '$category.icon',
                },
            },
            {
                $match: {
                    categorySlug: categorySlug,
                },
            },
            {
                $project: {
                    __v: 0,
                    category: 0,
                },
            },
        ])
    }

    async find() {
        const options = this.#model
            .find({}, { __v: 0 }, { sort: { _id: -1 } })
            .populate([{ path: 'category', select: { name: 1, slug: 1 } }])
        return options
    }
}

module.exports = new OptionService()
