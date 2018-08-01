import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

const LOG_DIR = path.normalize(`${process.cwd()}/logs`);

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const logger = winston.createLogger({
  exitOnError: false,
  silent: process.env.SUPPRESS_LOGS || process.env.NODE_ENV === 'test',
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.simple(),
      ),
    }),
    new DailyRotateFile({
      dirname: LOG_DIR,
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '1m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DDTHH:mm:ss+10:00',
        }),
        winston.format.json(),
      ),
    }),
  ],
});

export default logger;
