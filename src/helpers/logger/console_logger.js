class ConsoleLogger {
  logTelegramMessage(msg) {
    const string = `${msg.from.id}:  ${msg.from.first_name} ${msg.from.last_name} - ${msg.text}`;
    console.log(string);
  }

  logQueryCallback(msg) {
    const {data, message} = msg;
    const string = `${message.from.id}:  ${message.from.first_name} ${message.from.last_name} - ${message.text}, ${data}`;
    console.log(string);
  }

  log(msg) {
    console.log(msg);
  }

  info(msg) {
    console.info(msg);
  }

  error(err) {
    throw err;
  }
}


module.exports = ConsoleLogger;
