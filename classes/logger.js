"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
require("winston-daily-rotate-file");
var colors = require('colors');
var logFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(function (info) { return "".concat(info.timestamp.replace("T", " ").replace("Z", ""), " ").concat(info.level.toUpperCase(), " : ").concat(info.message); }));
var consoleFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(function (info) {
    var colorizer = colors[info.level] || colors.blue;
    var level = colorizer(info.level.toUpperCase());
    var timestamp = colors.timestamp(info.timestamp.replace("T", " ").replace("Z", ""));
    var message = colors.prompt(info.message);
    return "".concat(timestamp, " [").concat(level, "] : ").concat(message);
}));
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: logFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' }),
        new winston_1.transports.DailyRotateFile({
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
    exports.logger.add(new winston_1.transports.Console({
        format: consoleFormat,
        level: "silly"
    }));
}
