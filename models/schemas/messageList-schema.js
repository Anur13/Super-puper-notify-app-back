const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const messageListValidations = {
  create: Joi.object({
    title: Joi.string().min(1).required(),
    folderId: Joi.string().allow(null),
    messagesId: Joi.array().required(), //TODO: When message schema is created, add .has(Schema)
    // userId: Joi.objectId().required()
  }),
  get: Joi.object({
    id: Joi.objectId(),
  }),
  delete: Joi.object({
    id: Joi.objectId(),
  }),
  update: Joi.object({
    id: Joi.objectId().required(),
    title: Joi.string().min(1),
    messagesId: Joi.array().required(), //TODO: When message schema is created, add .has(Schema)
    sys: Joi.object({
      lastUpdated: Joi.date().iso(),
    }),
  }),
};

module.exports = messageListValidations;
