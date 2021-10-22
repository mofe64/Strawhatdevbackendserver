import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import AppError from './util/AppError.js';
import globalErrorHandler from './controllers/ErrorController.js';
import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';
import subscriptionRouter from './routers/subscriptionRouter.js';

dotenv.config({ path: './config.env' });


const app = express();
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: false }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;