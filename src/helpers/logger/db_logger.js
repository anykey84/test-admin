const ConsoleLogger = require('./console_logger');
const Log = require('../../database/models').Log;
const consoleLogger = new ConsoleLogger();


class DBLogger {
  logTelegramMessage(msg) {
    consoleLogger.logTelegramMessage(msg);
    // TODO: handle emojy
    Log.create({
      text: msg.text,
      photo: msg.photo ? msg.photo[msg.photo.length - 1].file_id : null,
      userId: msg.from.id
    }).catch((err) => {
      // if(err) consoleLogger.error(err);
    });
  }

  logQueryCallback(msg) {
    const {data, message} = msg;
    Log.create({
      text: message.text,
      userId: message.from.id,
      data
    }).catch((err) => {
      // if(err) consoleLogger.error(err);
    });
  }

  error(err) {
    throw err;
  }

  info(msg) {
    console.info(msg);
  }

  log(msg) {
    console.log(msg);
  }
}


module.exports = DBLogger;
