const createHttpError = require('http-errors')
const UserModel = require('../user/user.model')
const autoBind = require('auto-bind')
const { AuthMessage } = require('./auth.messages')
const { randomInt } = require('crypto')

class AuthService {
    #model

    constructor() {
        this.#model = UserModel
        autoBind(this)
    }
    async sendOTP(mobile) {
        const user = await this.#model.findOne({ mobile })
        const now = new Date().getTime()
        const otp = {
            code: randomInt(10000, 99999),
            expiredIn: now + 1000 * 60 * 2, // 2 minutes
        }

        if (!user) {
            const newUser = await this.#model.create({
                mobile,
                otp,
            })
            return newUser
        }

        if (user.otp && user.otp.expiredIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        }

        user.otp = otp
        await user.save()
    }

    async checkOTP(mobile, code) {}

    async checkExistByMobile(mobile) {
        const user = this.#model.findOne({ mobile })
        if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound)
        return user
    }
}

module.exports = new AuthService()
