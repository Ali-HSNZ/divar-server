const autoBind = require('auto-bind')
const CategoryModel = require('./category.model')
const { isValidObjectId, Types } = require('mongoose')
const createHttpError = require('http-errors')
const CategoryMessages = require('./category.message')
const slugify = require('slugify')

class CategoryService {
    #model
    constructor() {
        autoBind(this)
        this.#model = CategoryModel
    }
    async create(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existCategory = await this.checkExistById(categoryDto.parent)
            categoryDto.parent = existCategory._id
            categoryDto.parents = [
                ...new Set(
                    [existCategory._id.toString()]
                        .concat(existCategory.parents.map((id) => id.toString()))
                        .map((id) => new Types.ObjectId(id))
                ),
            ]
        }
        if (categoryDto?.slug) {
            categoryDto.slug = slugify(categoryDto.slug)
            await this.alreadyExistBySlug(categoryDto.slug)
        } else {
            categoryDto.slug = slugify(categoryDto.name)
        }

        const category = await this.#model.create(categoryDto)
        return category
    }

    async checkExistById(id) {
        const category = this.#model.findById(id)
        if (!category) {
            throw new createHttpError.NotFound(CategoryMessages.NotFound)
        }
        return category
    }
    async checkExistBySlug(slug) {
        const category = this.#model.findOne({ slug })
        if (!category) {
            throw new createHttpError.NotFound(CategoryMessages.NotFound)
        }
        return category
    }
    async alreadyExistBySlug(slug) {
        const category = this.#model.findOne({ slug })
        if (category) {
            throw new createHttpError.Conflict(CategoryMessages.AlreadyExist)
        }
        return category
    }
    async find() {
        return await this.#model.find({ parent: { $exists: false } })
    }
}

module.exports = new CategoryService()
