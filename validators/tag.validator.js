const Joi = require('joi');

const createTagValidator = Joi.object({
  name: Joi.string().min(1).max(255).required().messages({
    'any.required': 'Name is required',
  }),
});

module.exports = {
  createTagValidator,
};
