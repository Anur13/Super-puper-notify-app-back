const APIError = require("../errors/generalErrors");
const { errorStatusCodes } = require("../common/constants/constants");

const authErrors = {
  invalidToken: new APIError(
    "INVALID TOKEN",
    errorStatusCodes.UNAUTHORIZED,
    "Invalid token.",
  ),

  expiredToken: new APIError(
    "EXPIRED TOKEN",
    errorStatusCodes.UNAUTHORIZED,
    "Token has been expired",
  ),

  missingBearerToken: new APIError(
    "MISSING BEARER TOKEN",
    errorStatusCodes.NOT_FOUND,
    "Token was not provided in headers",
  ),
};

module.exports = authErrors;
