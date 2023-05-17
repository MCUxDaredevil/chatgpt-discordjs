import {createLogger, format, transports} from "winston";
import 'winston-daily-rotate-file'

const colors = require('colors')

const logFormat = format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp.replace("T", " ").replace("Z", "")} ${info.level.toUpperCase()} : ${info.message}`)
);

const consoleFormat = format.combine(
    format.timestamp(),
    format.printf((info) => {
        const colorizer = colors[info.level] || colors.blue
        const level = colorizer(info.level.toUpperCase())
        const timestamp = colors.timestamp(info.timestamp.replace("T", " ").replace("Z", ""));
        const message = colors.prompt(info.message);
        return `${timestamp} [${level}] : ${message}`;
    })
)

export const logger = createLogger({
    level: 'info',
    format: logFormat,
    defaultMeta: {service: 'user-service'},
    transports: [
        new transports.File({filename: 'error.log', level: 'error'}),
        new transports.File({filename: 'combined.log'}),
        new transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});


// winston.transport.on('rotate', function (oldFilename, newFilename) {
//     // do something fun
// });


colors.setTheme({
    timestamp: 'gray',
    prompt: 'white',
    info: 'green',
    warn: 'yellow',
    debug: 'brightMagenta',
    error: 'red'
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: consoleFormat,
        level: "silly"
    }));
}
