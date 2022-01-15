const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userValidations = {
  create: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    userName: Joi.string()
      .min(2)
      .max(15)
      .rule({ message: "User name must be between 2 and 15 characters" }),
    config: Joi.objectId(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  }),
};

module.exports = userValidations;
