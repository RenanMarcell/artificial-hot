const swaggerJsDoc = require('swagger-jsdoc');

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

module.exports = {
    swaggerDocs,
    custom_css
};