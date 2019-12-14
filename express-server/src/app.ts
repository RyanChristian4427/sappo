import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

// Controllers (route handlers)
import * as messageController from './controllers/messages';
import {MONGODB_URI} from './util/secrets';

// Create Express server
const app = express();

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

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/**
 * API examples routes.
 */
app.post('/api/v1/message', messageController.postMessage);
app.get('/api/v1/messages', messageController.getMessages);


export default app;
