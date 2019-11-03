import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Controllers (route handlers)
import * as authController from './controllers/auth';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

const x = 5;
/**
 * API examples routes.
 */
if (5 === x) {
    app.post('/api/v1/users/login', authController.login);
}


export default app;
