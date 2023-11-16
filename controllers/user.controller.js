const {
  handleResponse,
  handleServerError,
} = require('../helpers/responseHelper');
const { User } = require('../models');
const { createUserValidator } = require('../validators/user.validator');

exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    return handleResponse(res, 200, response);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return handleResponse(res, 404, {
        message: 'User not found.',
      });
    }

    return handleResponse(res, 200, user);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    const { error, value } = createUserValidator.validate(userData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { username } = value;

    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return handleResponse(res, 400, {
        message: 'Username is already in use.',
      });
    }

    const user = await User.create({
      username,
    });

    return handleResponse(res, 201, {
      createdUser: user,
      message: `User ${user.username} Created Successfully.`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const { error, value } = createUserValidator.validate(userData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { username } = value;

    const user = await User.findByPk(userId);
    if (!user) {
      return handleResponse(res, 404, { message: 'User not found.' });
    }

    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return handleResponse(res, 400, {
        message: 'Username is already in use.',
      });
    }

    await user.update({
      username,
    });

    return handleResponse(res, 200, {
      editedUser: user,
      message: `User ${user.username} Edited Successfully.`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return handleResponse(res, 404, { message: 'User not found.' });
    }

    await user.destroy();

    return handleResponse(res, 200, {
      deletedUser: user,
      message: `User {user.username} Deleted Successfully.`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};
