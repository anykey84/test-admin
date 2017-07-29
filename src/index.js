/** Setting NODE_ENV variable
 * Available variables:
 * "production" - for production
 * "development" - for development (default)
 */
// Get config from .env file
require('dotenv').config({path: '../env'});
const env = process.env;
env.NODE_ENV = env.NODE_ENV || 'development';


// Global
global.Promise = require('bluebird');
global.Promise.config({
  cancellation: true,
  warnings: true
});


// Params
const argv = require('optimist').argv;


// Modules
const Logger = require('./helpers/logger');
const Bot = require('./bot');
const logger = env.NODE_ENV === 'development' ? new Logger('console') : new Logger('db');


// FunctionsÎ
const startServices = () => {
  const botWrapper = new Bot({
    logger
  });
  return botWrapper.bot.startPolling();
};


// Start DB
logger.log(`NODE_ENV = ${env.NODE_ENV}`);
startServices();
