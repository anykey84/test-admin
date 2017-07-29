module.exports = function (scope, next) {
  if (scope.update.message) {
    this.logger.logTelegramMessage(scope.update.message);
  }
  if (scope.update.callback_query) {
    this.logger.logQueryCallback(scope.update.callback_query);
  }
  next();
};
