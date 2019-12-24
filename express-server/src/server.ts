import {app, server} from 'src/app';
import logger from 'src/util/logger';

server.listen(app.get('port'), () => {
    logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    logger.info('Press CTRL-C to stop');
});
