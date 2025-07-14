import { ILogger } from "@certd/basic";

const defaultLogger: ILogger = {
  info(...args: any[]) {
    console.log(...args);
  },
  warn(...args: any[]) {
    console.warn(...args);
  },
  error(...args: any[]) {
    console.error(...args);
  },
  debug(...args: any[]) {
    console.log(...args);
  },
} as ILogger;

let currentLogger: ILogger = defaultLogger;

export function setLogger(logger: ILogger) {
  currentLogger = logger;
}

export function getLogger(): ILogger {
  return currentLogger;
}
