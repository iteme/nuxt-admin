import { existsSync, mkdirSync } from 'fs';
import { parse } from 'path';
import { configure, getLogger } from 'log4js';
import { logConfig } from '../config';

const logsDir = parse(logConfig.path).dir;
if (!existsSync(logsDir)) {
  mkdirSync(logsDir);
}

configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: logConfig.path,
      pattern: 'yyyy-MM-dd',
      daysToKeep: 14,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: logConfig.level,
    },
  },
});

const logger = getLogger('[app]');

export default logger;
