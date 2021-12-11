const APIError = require("../errors/generalErrors");
const { errorStatusCodes } = require("../helpers/constants/constants");

const messageListErrors = {
  sameTitleCreate: new APIError(
    "CREATE SAME TITLE",
    errorStatusCodes.NOT_FOUND,
    "Cannot create. Message list with this title already exists.",
  ),
  sameTitleUpdate: new APIError(
    "UPDATE SAME TITLE",
    errorStatusCodes.NOT_FOUND,
    "Cannot update. Message list with this title already exists.",
  ),
  notFound: new APIError(
    "NOT FOUND",
    errorStatusCodes.NOT_FOUND,
    "No such message list found",
  ),
};

module.exports = messageListErrors;
