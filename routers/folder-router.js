const express = require("express");
const Constants = require("../common/constants/constants");
const router = express.Router();
const FolderController = require("../controller/folder-controller");
const isAuthorized = require("../middlewares/auth-middleware");

router.use(isAuthorized);
router.post(Constants.routes.folder.create, FolderController.create);
router.get(Constants.routes.folder.get, FolderController.get);
router.delete(Constants.routes.folder.delete, FolderController.delete);
router.post(Constants.routes.folder.update, FolderController.update);

module.exports = router;
