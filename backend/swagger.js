const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FINDIT API',
    version: '1.0.0',
    description: 'Lost & Found API for FINDIT',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    schemas: {
      ItemCompact: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 101 },
          title: { type: 'string', example: 'Black Leather Wallet' },
          category: { type: 'string', example: 'Wallet' },
          status: { type: 'string', example: 'Lost' },
          date: { type: 'string', example: '2025-08-05' },
          location: { type: 'string', example: 'Mumbai Central Station' }
        }
      },
      ItemFull: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 101 },
          title: { type: 'string', example: 'Black Leather Wallet' },
          description: { type: 'string', example: 'Contains ID cards and cash' },
          category: { type: 'string', example: 'Wallet' },
          status: { type: 'string', example: 'Lost' },
          date: { type: 'string', example: '2025-08-05' },
          location: { type: 'string', example: 'Mumbai Central Station' },
          image_url: { type: 'string', example: 'https://example.com/wallet.jpg' },
          posted_by: { type: 'integer', example: 1 }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Item not found' }
        }
      },
      PostItemRequest: {
        type: 'object',
        required: ['title', 'category', 'status', 'date', 'location', 'posted_by'],
        properties: {
          title: { type: 'string', example: 'Black Leather Wallet' },
          description: { type: 'string', example: 'Contains ID cards and cash' },
          category: { type: 'string', example: 'Wallet' },
          status: { type: 'string', example: 'Lost' },
          date: { type: 'string', example: '2025-08-05' },
          location: { type: 'string', example: 'Mumbai Central Station' },
          image_url: { type: 'string', example: 'https://example.com/wallet.jpg' },
          posted_by: { type: 'integer', example: 1 }
        }
      },
      PostItemResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Item posted successfully' },
          item_id: { type: 'integer', example: 101 }
        }
      },
      UpdateStatusRequest: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', example: 'Found' }
        }
      },
      GenericMessageResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Item status updated successfully' }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerDefinition);

module.exports = swaggerSpec;