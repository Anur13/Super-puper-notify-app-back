const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const messageListValidations = {
  //TODO: proper validate messageId type = ObjectId
  create: Joi.object({
    title: Joi.string().min(1).required(),
    folderId: Joi.objectId,
    messagesId: Joi.array(), //TODO: When message schema is created, add .has(Schema)
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
  }),
};

module.exports = messageListValidations;
