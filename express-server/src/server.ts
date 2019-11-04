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

const io: any = socketIo(server);
io.on('connection', (socket: any) => {
    socket.on('change_username', (newName: string) => {
        io.username = newName;
        io.emit('new_user_join', {newUserName: newName});
    });
});

export default server;
