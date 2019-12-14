import errorHandler from 'errorhandler';
import socketIo from 'socket.io';
import logger from 'src/util/logger';

server.listen(app.get('port'), () => {
    logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    logger.info('Press CTRL-C to stop');
});

const io = socketIo(server);
io.on('connection', (socket) => {
    socket.on('user_join', (newName: string) => {
        io.emit('new_user_join', newName);
    });
});
app.set('io', io);

export default server;
