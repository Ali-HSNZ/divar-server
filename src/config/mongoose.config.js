const { connect } = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to DB.')
    })
    .catch((err) => {
        console.log(err?.message ?? 'Failed to connect DB.')
    })
