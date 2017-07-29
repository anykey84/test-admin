const env = process.env;
const admins = env.ADMINS ? env.ADMINS.split(',') : [];


module.exports = function (scope, next) {
  const id = scope.from.id;
  if(admins.find(i => i == id)) {
    return next();
  }
};
