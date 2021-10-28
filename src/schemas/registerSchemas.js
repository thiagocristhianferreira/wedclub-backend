const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  city: Joi.string().min(2).required(),
  age: Joi.number().required(),
});

module.exports = {
  create,
};