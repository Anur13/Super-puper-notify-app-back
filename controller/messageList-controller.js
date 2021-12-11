const messageListValidations = require("../models/schemas/messageList-schema");
const MessageListService = require("../services/messageList-service");
const { reformatResponse } = require("../helpers/controller-helper");

const MessageListController = {
  create: async function (req, res, next) {
    const { error, value } = messageListValidations.create.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    try {
      const response = await MessageListService.create(value);
      res.status(200).send(reformatResponse(response));
    } catch (e) {
      next(e, req, res);
    }
  },

  get: async function (req, res, next) {
    const { error, value } = messageListValidations.get.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    try {
      const response = await MessageListService.get(value.id);
      res.status(200).send(reformatResponse(response));
    } catch (e) {
      next(e, req, res);
    }
  },

  delete: async function (req, res, next) {
    const { error, value } = messageListValidations.delete.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    try {
      await MessageListService.delete(value.id);
      res.status(200).send({});
    } catch (e) {
      next(e, req, res);
    }
  },

  update: async function (req, res, next) {
    const { value, error } = messageListValidations.update.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const messageListToUpdate = await MessageListService.get(value.id);
    try {
      const object = { ...messageListToUpdate.toJSON(), ...value };
      delete object._id;
      const response = await MessageListService.update(object);
      res.status(200).send(reformatResponse(response));
    } catch (e) {
      next(e, req, res);
    }
  },
};

module.exports = MessageListController;
