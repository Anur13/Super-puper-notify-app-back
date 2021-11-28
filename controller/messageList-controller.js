const messageListValidations = require("../models/schemas/messageList-schema");

const MessageListService = require("../services/messageList-service");

const MessageListController = {
  create: async function (req, res) {
    const { error, value } = messageListValidations.create.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    // TODO: add implementation regarding unique title in lowerCase

    //TODO: check duplicate via get command

    try {
      const response = await MessageListService.create(value);
      if (!response) {
        return res
          .status(400)
          .json({ message: "Message list with such name already exists" });
      }
      response.id = response._id;
      delete response._id;

      res.status(201).send(response);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  get: async function (req, res) {
    const { error, value } = messageListValidations.get.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const response = await MessageListService.get(value.id);
    if (!response) return res.status(404).send();

    response.id = response._id;
    delete response._id;
    res.status(200).send(response);
  },

  delete: async function (req, res) {
    const { error, value } = messageListValidations.delete.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error });
    }
    try {
      const messageList = await MessageListService.delete(value.id);
      if (messageList) {
        res.status(200).send({});
      } else {
        return res.status(404).json({ message: "No such message list found" });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async function (req, res) {
    const { value, error } = messageListValidations.update.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const messageListToUpdate = await MessageListService.get(value.id);
    if (!messageListToUpdate) {
      return res.status(404).json({ message: "No such message list found" });
    }
    // TODO: add implementation regarding unique title in lowerCase
    try {
      const object = { ...messageListToUpdate.toJSON(), ...value };
      delete object._id;
      const response = await MessageListService.update(object);
      response.id = response._id;
      delete response._id;

      res.status(200).send(object);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

module.exports = MessageListController;
