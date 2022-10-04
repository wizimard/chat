import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDb } from "./db";

import Router from './router/Router';

import errorMiddleware from './middlewares/ErrorMiddleware';

import './web-socket/WebSocket';

import { CLIENT_URL, PORT } from './constants/env';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());

app.use('/api', Router);

app.use(express.static(__dirname + '\\..\\public'));

app.use(errorMiddleware);

const start = async() => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is listening on the port: ${PORT}`);
    });
  } catch(e) {
    console.log(e);
  }
}
start();