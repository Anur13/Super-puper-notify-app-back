const express = require("express");
const Constants = require("../common/constants/constants");
const router = express.Router();
const MessageController = require("../controller/message-controller");
const isAuthorized = require("../middlewares/auth-middleware");

router.use(isAuthorized);
router.post(Constants.routes.message.create, MessageController.create);
router.get(Constants.routes.message.get, MessageController.get);
router.delete(Constants.routes.message.delete, MessageController.delete);
router.patch(Constants.routes.message.update, MessageController.update);

module.exports = router;
