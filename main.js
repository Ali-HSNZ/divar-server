const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const main = async () => {
    const app = express()
    const port = process.env.PORT
    require('./src/config/mongoose.config')
    app.listen(port, () => {
        console.log(`server started: http://localhost:${port}\n`)
    })
}
main()
