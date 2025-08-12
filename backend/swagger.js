const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FINDIT Lost & Found API',
            version: '1.0.0',
            description: 'API for managing lost and found items (matches API_CONTRACT.md)',
        },
        servers: [
            { url: 'http://localhost:5000' }
        ],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);
