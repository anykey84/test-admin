const TelegramBot = require('telegraf');
const env = process.env;


module.exports = function (scope, next) {
  scope.i18n.t('undefinedCommand');

  const keyboards = [
    `cd ${env.PROJECT_DIRECTORY}; git pull; yarn; npm run dist;`,
  ];

  scope.defaultKeyboard = TelegramBot
    .Markup
    .keyboard(keyboards, {columns: 1})
    .resize()
    .extra();

  next();
};
