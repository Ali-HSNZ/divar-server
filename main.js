const express = require('express')
const dotenv = require('dotenv')
const swaggerConfig = require('./src/config/swagger.config')
const mainRouter = require('./src/app.routes')
dotenv.config()

const main = async () => {
    const app = express()
    const port = process.env.PORT
    require('./src/config/mongoose.config')
    swaggerConfig(app)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(mainRouter)
    app.listen(port, () => {
        console.log(`server started: http://localhost:${port}\n`)
    })
}
main()
