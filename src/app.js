import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errorHandler } from './middleware/ErrorHandler.js';
import userRoutes from './modules/user/User.routes.js';
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Management System API',
            version: '1.0.0',
            description: 'API documentation for EMS'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3030}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/modules/**/**.routes.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;