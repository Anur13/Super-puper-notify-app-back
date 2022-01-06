const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const messageValidations = {
  create: Joi.object({
    content: Joi.string().required(),
    messageListId: Joi.objectId().required(),
  }),
  get: Joi.object({
    id: Joi.objectId(),
  }),
  delete: Joi.object({
    id: Joi.objectId(),
  }),
  update: Joi.object({
    id: Joi.objectId().required(),
    content: Joi.string(),
    messageListId: Joi.objectId(),
  }),
};

module.exports = messageValidations;
