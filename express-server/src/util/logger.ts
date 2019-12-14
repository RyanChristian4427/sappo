import winston from 'winston';

const logFormat = winston.format.printf((log) => {
    return `${log.level}: ${JSON.stringify(log.message, null, 4)}`;
});

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'debug' : 'debug',
            format: winston.format.combine(winston.format.colorize(), logFormat),
        }),
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}

export default logger;
