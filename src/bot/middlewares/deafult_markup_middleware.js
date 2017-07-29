const TelegramBot = require('telegraf');


module.exports = function (scope, next) {
  scope.i18n.t('undefinedCommand');

  const keyboards = [
    `echo Test; exit 0;`,
  ];

  scope.defaultKeyboard = TelegramBot
    .Markup
    .keyboard(keyboards, {columns: 1})
    .resize()
    .extra();

  next();
};
