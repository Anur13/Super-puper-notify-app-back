const messageListValidations = require("../models/schemas/messageList-schema");
const APIError = require("../errors/generalErrors");
const MessageListService = require("../services/messageList-service");
const messageListErrors = require("../errors/messageListErrors");

const MessageListController = {
  create: async function (req, res, next) {
    const { error, value } = messageListValidations.create.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    try {
      const response = await MessageListService.create(value);
      response.id = response._id;
      delete response._id;
      res.status(201).send(response);
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
      response.id = response._id;
      delete response._id;
      res.status(200).send(response);
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
      const messageList = await MessageListService.delete(value.id);
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
      response.id = response._id;
      delete response._id;
      res.status(200).send(response);
    } catch (e) {
      next(e, req, res);
    }
  },
};

module.exports = MessageListController;
