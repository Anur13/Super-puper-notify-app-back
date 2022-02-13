const express = require("express");
const Constants = require("../common/constants/constants");
const router = express.Router();
const MessageListController = require("../controller/messageList-controller");
const isAuthorized = require("../middlewares/auth-middleware");

router.use(isAuthorized);
router.post(Constants.routes.messageList.create, MessageListController.create);
router.get(Constants.routes.messageList.get, MessageListController.get);
router.delete(Constants.routes.messageList.delete, MessageListController.delete);
router.patch(Constants.routes.messageList.update, MessageListController.update);

module.exports = router;
