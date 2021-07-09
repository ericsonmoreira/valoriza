import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import { errorHandler } from './middlewares/errorHandler';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('🔥 https://localhost:3000 🔥');
});
