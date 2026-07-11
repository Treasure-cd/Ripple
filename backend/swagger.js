import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Ripple API',
      version: '1.0.0',
      description: 'API documentation for the Ripple backend services.',
    },
    servers: [
      {
        url: 'http://localhost:5500',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Ada' },
            email: { type: 'string', format: 'email', example: 'ada@example.com' },
            cached_balance: { type: 'integer', example: 0 },
            social_links: {
              type: 'object',
              nullable: true,
              example: { github: 'https://github.com/ada' },
            },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        AuthSuccessResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        UserProfileResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Invalid credentials' },
                stack: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
    },
  },
  apis: [`${__dirname}/routes/*.js`, `${__dirname}/index.js`],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
