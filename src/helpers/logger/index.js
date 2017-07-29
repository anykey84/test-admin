const ConsoleLogger = require('./console_logger');
// const DBLogger = require('./db_logger');


class Logger {
  constructor(type) {
    switch(type) {
      // case 'db':
      //   return this.logger = new DBLogger();
      case 'console':
        return this.logger = new ConsoleLogger();
      default:
        return this.logger = new ConsoleLogger();
    }
  }

  logTelegramMessage(msg) {
    this.logger.logTelegramMessage(msg);
  }

  logQueryCallback(msg) {
    this.logger.logQueryCallback(msg);
  }

  log(msg) {
    this.logger.log(msg);
  }

  info(msg) {
    this.logger.info(msg);
  }

  error(err) {
    this.logger.error(err);
  }
}


module.exports = Logger;
