const { createTagValidator } = require('../validators/tag.validator');
const { Tag } = require('../models');
const {
  handleServerError,
  handleResponse,
} = require('../helpers/responseHelper');

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    return handleResponse(res, 200, tags);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getTagById = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return handleResponse(res, 404, {
        message: 'Tag not found',
      });
    }

    return handleResponse(res, 200, tag);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createTag = async (req, res) => {
  try {
    const tagData = req.body;

    const { error, value } = createTagValidator.validate(tagData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { name } = value;

    const tag = await Tag.create({
      name,
    });

    return handleResponse(res, 201, tag);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const tagData = req.body;

    const { error, value } = createTagValidator.validate(tagData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { name } = value;

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return handleResponse(res, 404, { message: 'Tag not found' });
    }

    await tag.update({
      name,
    });

    return handleResponse(res, 200, tag);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return handleResponse(res, 404, { message: 'Tag not found' });
    }

    // Delete the tag
    await tag.destroy();

    return handleResponse(res, 200, { deletedTag: tag });
  } catch (error) {
    return handleServerError(res);
  }
};
