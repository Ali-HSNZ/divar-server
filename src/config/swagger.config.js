const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerConfig = (app) => {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            info: {
                title: 'Divar',
                description: '',
                version: '1.0.0',
            },
        },
        apis: [],
    })

    const swagger = swaggerUi.setup(swaggerDocument, {})
    app.use('/swagger', swaggerUi.serve, swagger)
}

module.exports = swaggerConfig
