const messageValidations = require("../models/schemas/message-schema");
const MessageService = require("../services/message-service");
const { reformatResponse } = require("../helpers/controller-helper");

const MessageController = {
  create: async function (req, res, next) {
    const { error, value } = messageValidations.create.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const response = await MessageService.create(value);
      res.status(200).send(reformatResponse(response));
    } catch (e) {
      next(e, req, res);
    }
  },

  get: async function (req, res, next) {
    const { error, value } = messageValidations.get.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const response = await MessageService.get(value.id);
      res.status(200).send(reformatResponse(response));
    } catch (e) {
      next(e, req, res);
    }
  },

  delete: async function (req, res, next) {
    const { error, value } = messageValidations.delete.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      await MessageService.delete(value.id);
      res.status(200).send({});
    } catch (e) {
      next(e, req, res);
    }
  },

  update: async function (req, res, next) {
    const { value, error } = messageValidations.update.validate(req.body);
    if (error) {
      return next(error);
    }
    const messageListToUpdate = await MessageService.get(value.id);
    try {
      const object = { ...messageListToUpdate.toJSON(), ...value };
      delete object._id;
      const response = await MessageService.update(object);
      res.status(200).send(reformatResponse(response));
    } catch (e) {
      next(e, req, res);
    }
  },
};

module.exports = MessageController;
