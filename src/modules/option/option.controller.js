const autoBind = require('auto-bind')
const optionService = require('./option.service')
const OptionMessages = require('./option.message')
const httpCodes = require('http-codes')
class OptionController {
    #service
    constructor() {
        autoBind(this)
        this.#service = optionService
    }

    async create(req, res, next) {
        try {
            const { title, key, guid, enum: list, category, type, required } = req.body
            await this.#service.create({ title, key, guid, enum: list, category, type, required })
            return res.status(httpCodes.CREATED).json({
                message: OptionMessages.Created,
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params
            const { title, key, guid, enum: list, category, type, required } = req.body
            await this.#service.update(id, {
                title,
                key,
                guid,
                enum: list,
                category,
                type,
                required,
            })
            return res.json({
                message: OptionMessages.Updated,
            })
        } catch (error) {
            next(error)
        }
    }
    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params
            const options = await this.#service.findByCategoryId(categoryId)
            return res.status(200).json(options)
        } catch (error) {
            next(error)
        }
    }
    async findByCategorySlug(req, res, next) {
        try {
            const { categorySlug } = req.params
            const options = await this.#service.findByCategorySlug(categorySlug)
            return res.status(200).json(options)
        } catch (error) {
            next(error)
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params
            const option = await this.#service.findById(id)
            return res.status(200).json(option)
        } catch (error) {
            next(error)
        }
    }
    async removeById(req, res, next) {
        try {
            const { id } = req.params
            await this.#service.removeById(id)
            return res.status(200).json({
                message: OptionMessages.Deleted,
            })
        } catch (error) {
            next(error)
        }
    }
    async find(req, res, next) {
        try {
            const options = await this.#service.find()
            return res.status(200).json(options)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController()
