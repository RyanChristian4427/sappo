import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import mongoose from 'mongoose';
import socketIo from 'socket.io';

import apiV1 from 'src/api/v1';
import {setUpSockets} from 'src/sockets/setup';
import logger from 'src/util/logger';
import {MONGODB_URI} from 'src/util/secrets';

// Create Express server
export const app = express();
export const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch((err) => {
    logger.debug('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});

// Express configuration
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Socket configuration
export const socket = setUpSockets(socketIo(server));

app.use('/api/v1', apiV1);
