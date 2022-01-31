const APIError = require("../errors/generalErrors");
const { errorStatusCodes } = require("../common/constants/constants");

const userErrors = {
  alreadyExist: email =>
    new APIError(
      "USER ALREADY EXISTS",
      errorStatusCodes.CONFLICT,
      `User with email: "${email}" already exists, pls log in`,
      "user/registration",
    ),
  incorrectPassword: new APIError(
    "USER INCORRECT PASSWORD",
    errorStatusCodes.BAD_REQUEST,
    "Incorrect password",
    "user/login",
  ),
  //TODO: Possible security vulnerability

  notFound: value =>
    new APIError(
      "USER NOT FOUND",
      errorStatusCodes.NOT_FOUND,
      `User with: "${value}" doesnt exist`,
      "user/login",
    ),
};

module.exports = userErrors;
