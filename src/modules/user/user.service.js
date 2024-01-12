const createHttpError = require('http-errors')

const autoBind = require('auto-bind')
const UserModel = require('./user.model')

class UserService {
    #model

    constructor() {
        this.#model = UserModel
        autoBind(this)
    }

    async test() {}
}

module.exports = new UserService()
