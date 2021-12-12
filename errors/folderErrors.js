const APIError = require("../errors/generalErrors");
const { errorStatusCodes } = require("../common/constants/constants");

const folderErrors = {
  sameTitleCreate: new APIError(
    "CREATE SAME TITLE",
    errorStatusCodes.NOT_FOUND,
    "Cannot create. Folder with this title already exists.",
  ),
  sameTitleUpdate: new APIError(
    "UPDATE SAME TITLE",
    errorStatusCodes.NOT_FOUND,
    "Cannot update. Folder with this title already exists.",
  ),
  notFound: new APIError("NOT FOUND", errorStatusCodes.NOT_FOUND, "No such folder found"),
};

module.exports = folderErrors;
