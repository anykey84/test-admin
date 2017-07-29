module.exports = function (scope) {
  const message = scope.i18n.t('start');

  return scope.reply(message);
};
