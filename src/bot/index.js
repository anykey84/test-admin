const env = process.env;


// Modules
const path = require('path');
const exec = require('child_process').exec;
const TelegramBot = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const authMiddleware = require('./middlewares/auth_middleware');
const defaultMarkupMiddleware = require('./middlewares/deafult_markup_middleware');
const logMiddleware = require('./middlewares/log_middleware');

// Config
const common = require('./common');
const i18n = new TelegrafI18n({
  defaultLocale: env.TELEGRAM_DEFAULT_LANGUAGE,
  allowMissing: true,
  directory: path.resolve(__dirname, '../enum/strings')
});


// Bot
module.exports = class Bot {
  constructor(params) {
    this.logger = params.logger;
    this.bot = new TelegramBot(env.TELEGRAM_API_KEY);

    // Middleware
    this.bot.use(TelegramBot.memorySession());
    this.bot.use(i18n.middleware());
    this.bot.use(logMiddleware.bind(this));
    this.bot.use(authMiddleware.bind(this));
    this.bot.use(defaultMarkupMiddleware.bind(this));

    require('./commands').bind(this)();

    // Events
    this.bot.on('message', this.onMessage.bind(this));
  }


  onMessage(scope) {
    scope.update.message.text = scope.update.message.text || '';
    const msgText = scope.update.message.text;

    exec(msgText, (error, stdout, stderr) => {
      const err = error || stderr;
      if(err) {
        this.notifyAboutError(scope, err);
        return this.logger.error(err);
      }
      scope.reply(stdout, scope.defaultKeyboard);
    });
  }

  notifyAboutError(scope, err) {
    return Promise.all([
      this.bot.telegram.sendMessage(common.alexTelegramId, scope.i18n.t('notifyAboutError', {err})),
      scope.reply(scope.i18n.t('commonError'))
    ]);
  }
};
