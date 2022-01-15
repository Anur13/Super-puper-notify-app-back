const UserServices = require("../services/user-service");
const userValidations = require("../models/schemas/user-schema");
const { reformatResponse } = require("../helpers/controller-helper");

const UserController = {
  create: async function (req, res, next) {
    const { error, value } = userValidations.create.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    value.email = value.email.toLowerCase();

    let response;
    try {
      response = await UserServices.createUser(value);
    } catch (e) {
      next(e);
    }

    const object = reformatResponse(response);
    res.status(201).send(object);
  },

  login: async function (req, res, next) {
    const { error, value } = userValidations.login.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    value.email = value.email.toLowerCase();

    let response;
    try {
      response = await UserServices.login(value);
    } catch (e) {
      next(e);
    }

    const object = reformatResponse(response);
    res.status(200).send(object);
  },
};

module.exports = UserController;
