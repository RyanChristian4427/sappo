import errorHandler from 'errorhandler';
import socketIo from 'socket.io';

import app from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
});

const io = socketIo(server);
io.on('connection', (socket) => {
    socket.on('user_join', (newName: string) => {
        io.emit('new_user_join', newName);
    });
});
app.set('io', io);

export default server;
