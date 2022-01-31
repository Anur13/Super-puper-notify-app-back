const userDao = require("../dao/user-dao");
const bCrypt = require("bcryptjs");
const userErrors = require("../errors/userErrors");

const UserServices = {
  createUser: async function(object) {
    const checkUser = await userDao.getByEmail(object.email);
    if (checkUser) {
      throw userErrors.alreadyExist(object.email);
    }

    const hashedPassword = await bCrypt.hash(
      object.password,
      await bCrypt.genSalt(Number(process.env.SALT)),
    );

    const objectWithHashedPassword = { ...object, password: hashedPassword };
    return await userDao.create(objectWithHashedPassword);
  },

  login: async function(object) {
    const user = await userDao.getByEmail(object.email);
    if (!user) {
      throw userErrors.notFound(object.email);
    }

    const comparePassword = await bCrypt.compare(object.password, user.password);
    if (!comparePassword) {
      throw userErrors.incorrectPassword;
    }

    return user;
  },
};

module.exports = UserServices;
