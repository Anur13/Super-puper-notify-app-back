const User = require("../models/user-model");

const userDao = {
  create: function (object) {
    return User.create(object);
  },

  getByEmail: function (email) {
    return User.findOne({ email });
  },
};
module.exports = userDao;
