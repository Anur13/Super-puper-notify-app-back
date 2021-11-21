const express = require("express");
const Constants = require("../helpers/constants/constants");
const router = express.Router();
const FolderController = require("../controller/folder-controller");

router.post(Constants.routes.folder.create, FolderController.create);
router.get(Constants.routes.folder.get, FolderController.get);
router.post(Constants.routes.folder.delete, FolderController.delete);
router.post(Constants.routes.folder.update, FolderController.update);

module.exports = router;
