const UserServices = require("../services/user-service");
const userValidations = require("../models/schemas/user-schema");
const { reformatResponse } = require("../helpers/controller-helper");
const Auth = require("../helpers/auth");

const UserController = {
  create: async function (req, res, next) {
    const { error, value } = userValidations.create.validate(req.body);
    if (error) return next(error);
    value.email = value.email.toLowerCase();

    let response;
    try {
      response = await UserServices.createUser(value);
    } catch (e) {
      return next(e);
    }

    const token = Auth.createToken(response.toJSON()._id);
    const object = reformatResponse(response, token);
    res.status(201).send(object);
  },

  login: async function (req, res, next) {
    const { error, value } = userValidations.login.validate(req.body);
    if (error) return next(error);
    value.email = value.email.toLowerCase();

    let response;
    try {
      response = await UserServices.login(value);
    } catch (e) {
      return next(e);
    }

    const token = Auth.createToken(response.toJSON()._id);
    const object = reformatResponse(response, token);
    res.status(200).send(object);
  },
};

module.exports = UserController;
