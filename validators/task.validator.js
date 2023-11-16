const Joi = require('joi');

const createTaskValidator = Joi.object({
  title: Joi.string().trim().min(3).max(255).required().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least {#limit} characters long',
    'string.max': 'Title cannot be more than {#limit} characters long',
    'any.required': 'Title is required',
  }),
  description: Joi.string().allow('').max(1000).messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description cannot be more than {#limit} characters long',
  }),
  priority: Joi.string().valid('high', 'medium', 'low').messages({
    'any.only': 'Priority must be one of high, medium, or low',
  }),
  tags: Joi.array().items(Joi.number()).required().messages({
    'any.required': 'Tags is required, add at least one tag',
  }),
});

const editTaskValidator = Joi.object({
  title: Joi.string().min(3).max(255).messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least {#limit} characters long',
    'string.max': 'Title cannot be more than {#limit} characters long',
  }),
  description: Joi.string().allow('').max(1000).messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description cannot be more than {#limit} characters long',
  }),
  priority: Joi.string().valid('high', 'medium', 'low').messages({
    'any.only': 'Priority must be one of high, medium, or low',
  }),
  tags: Joi.array().items(Joi.number()),
});

const editTaskProgressValidator = Joi.object({
  progress: Joi.string()
    .valid('todo', 'in progress', 'done')
    .required()
    .messages({
      'any.only': 'Progress must be one of todo, in progress, or done',
      'any.required': 'Progress is required',
    }),
});

module.exports = {
  createTaskValidator,
  editTaskValidator,
  editTaskProgressValidator,
};
