const APIError = require("../errors/generalErrors");
const { errorStatusCodes } = require("../common/constants/constants");

const messageErrors = {

  notFound: new APIError(
    "NOT FOUND",
    errorStatusCodes.NOT_FOUND,
    "No such message found",
  ),
};

module.exports = messageErrors;
