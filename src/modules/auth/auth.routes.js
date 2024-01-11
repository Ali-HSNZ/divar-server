const { Router } = require('express')
const authService = require('./auth.service')

const router = Router()

router.post('/send-otp', authService.sendOTP)
router.post('/check-otp', authService.checkOTP)

module.exports = {
    AuthRouter: router,
}
