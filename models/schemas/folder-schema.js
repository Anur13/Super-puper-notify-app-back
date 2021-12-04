const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// TODO: change to object methods structure

const folderCreateType = Joi.object({
  title: Joi.string().min(1).required(),
  quantity: Joi.number(),
  sys: Joi.object({
    created: Joi.date().iso(),
    lastUpdated: Joi.date().iso(),
  }),
  order: Joi.number(),
  // userId: Joi.objectId().required()
});

const folderGetType = Joi.object({
  id: Joi.objectId().required(),
});

const folderDeleteType = Joi.object({
  id: Joi.objectId(),
});

const folderUpdateType = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().min(1),
  quantity: Joi.number(),
  sys: Joi.object({
    lastUpdated: Joi.date().iso(),
  }),
  order: Joi.number(),
});

module.exports = {
  folderCreateType,
  folderGetType,
  folderDeleteType,
  folderUpdateType,
};
