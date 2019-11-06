import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Controllers (route handlers)
import * as messageController from './controllers/messages';

// Create Express server
const app = express();

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
app.post('/api/v1/message', messageController.newMessage);


export default app;
