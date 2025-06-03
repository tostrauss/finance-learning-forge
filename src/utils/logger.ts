// Simple logger utility for development
class Logger {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix ? `[${prefix}] ` : '';
  }

  info(message: string, ...args: any[]) {
    console.log(`${this.prefix}${message}`, ...args);
  }

  error(message: string, error?: any) {
    console.error(`${this.prefix}${message}`, error || '');
  }

  warn(message: string, ...args: any[]) {
    console.warn(`${this.prefix}${message}`, ...args);
  }

  debug(message: string, ...args: any[]) {    if (import.meta.env.MODE === 'development') {
      console.debug(`${this.prefix}${message}`, ...args);
    }
  }
}

// Create and export a default logger instance
export const logger = new Logger('App');

// Allow creating custom loggers for different modules
export const createLogger = (prefix: string) => new Logger(prefix);