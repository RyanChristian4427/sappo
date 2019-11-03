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

// interface SocketConnection {
//     username: string;
// }

const io = socketIo(server);
io.on('connection', (socket: any) => {
    console.log('New User connected!');
    socket.username = 'Anonymous';
    console.log(socket.username);

    socket.on('change_username', (newName: string) => {
        socket.username = newName;
        console.log(socket.username);
    });
});

export default server;
