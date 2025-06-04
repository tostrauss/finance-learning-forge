// src/utils/logger.ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.name}] ${message}`;
  }

  info(message: string, ...args: any[]) {
    console.log(this.formatMessage('info', message), ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  error(message: string, ...args: any[]) {
    console.error(this.formatMessage('error', message), ...args);
  }

  debug(message: string, ...args: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }
}

export const logger = new Logger('App');
