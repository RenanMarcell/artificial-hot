const cron = require('node-cron');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('express-async-errors');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'Artificial hot API',
            description: 'Filter data from HOT posts on Artificial subreddit',
            contact: {
                name: "Renan Marcel"
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ['src/routes.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const custom_css = {
    customCss: '.try-out { display: none }'
};

const routes = require('./routes');
const scheduled_job = require('./scheduled');   

const PORT = 3000;
const HOST = '0.0.0.0';

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

cron.schedule("0 * * * *", async () => {
    await scheduled_job()
});

app.listen(PORT, HOST, () => {
    console.log('Server is running');
});