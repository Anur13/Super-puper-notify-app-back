const express = require("express");
const Constants = require("../common/constants/constants");
const router = express.Router();
const MessageListController = require("../controller/messageList-controller");
const authMiddleware = require("../middlewares/auth");

router.post(Constants.routes.messageList.create, MessageListController.create);
router.get(Constants.routes.messageList.get, authMiddleware, MessageListController.get);
router.delete(Constants.routes.messageList.delete, MessageListController.delete);
router.patch(Constants.routes.messageList.update, MessageListController.update);

module.exports = router;
