const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const folderValidations = {
  create: Joi.object({
    title: Joi.string().min(1).required(),
    quantity: Joi.number(),
    sys: Joi.object({
      created: Joi.date().iso(),
      lastUpdated: Joi.date().iso(),
    }),
    order: Joi.number(),
    userId: Joi.objectId().required(),
  }),

  get: Joi.object({
    id: Joi.objectId().required(),
  }),

  delete: Joi.object({
    id: Joi.objectId(),
  }),

  update: Joi.object({
    id: Joi.objectId().required(),
    title: Joi.string().min(1),
    quantity: Joi.number(),
    sys: Joi.object({
      lastUpdated: Joi.date().iso(),
    }),
    order: Joi.number(),
  }),
};

module.exports = folderValidations;
