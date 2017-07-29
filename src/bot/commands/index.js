module.exports = function () {
  this.bot.command('start', require('./start').bind(this));
};
