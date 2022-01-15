const express = require("express");
const Constants = require("../common/constants/constants");
const UserController = require("../controller/user-controller");
const router = express.Router();

router.post(Constants.routes.user.create, UserController.create);
router.post(Constants.routes.user.login, UserController.login);

module.exports = router;
