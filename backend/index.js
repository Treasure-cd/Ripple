import express from 'express'
import morgan from 'morgan';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import userRouter from './routes/user.routes.js'
import skillRouter from './routes/skill.routes.js'
import userSkillRouter from './routes/user-skill.routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from './database/auth.js';

dotenv.config()
console.log("Database url: ", process.env.DATABASE_URL) //you can add to test

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan('dev', { stream: { write: (message) => logger.info(message.trim()) } }));

app.all(/^\/api\/auth/, toNodeHandler(auth));
app.get('/', (req, res) => {
    res.json("Root of Ripple's")
})
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRouter);
app.use('/api/skills', skillRouter);
app.use('/api/users/me/skills', userSkillRouter)

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

app.listen(5500, () => logger.info('Server running on port 5500'));