import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import AppError from './util/AppError.js';
import globalErrorHandler from './controllers/ErrorController.js';

dotenv.config({ path: './config.env' });


const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10kb', extended: false }));



app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;