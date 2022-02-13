const Auth = require("../helpers/auth");
const AuthErrors = require("../errors/authErrors");

function isAuthorized(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw AuthErrors.missingBearerToken;

  try {
    Auth.validateToken(token);
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = isAuthorized;
