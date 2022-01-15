const APIError = require("../errors/generalErrors");
const { errorStatusCodes } = require("../common/constants/constants");

const userErrors = {
  alreadyExist: email =>
    new APIError(
      "USER ALREADY EXIST",
      errorStatusCodes.CONFLICT,
      `User with email: "${email}" already exist, pls log in`,
    ),
  incorrectPassword: new APIError(
    "USER INCORRECT PASSWORD",
    errorStatusCodes.BAD_REQUEST,
    "Incorrect password",
  ),

  notFound: value =>
    new APIError(
      "USER NOT FOUND",
      errorStatusCodes.NOT_FOUND,
      `User with: "${value}" doesnt exist`,
    ),
};

module.exports = userErrors;
