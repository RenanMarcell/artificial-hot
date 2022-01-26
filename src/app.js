const express = require('express');
const swaggerUi = require('swagger-ui-express');
require('express-async-errors');

const routes = require('./routes');
const { swaggerDocs, custom_css } = require('./swagger');

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, custom_css));
app.use(express.json());
app.use(routes);
app.use((err, request, response, next) => {
    if (err instanceof Error) return response.status(400).json({
        message: err.message
    })

    return response.status(500).json({
        'status': 'error',
        'message': 'Internal server error'
    })
})

module.exports = { app }