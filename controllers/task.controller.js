const {
  handleServerError,
  handleResponse,
} = require('../helpers/responseHelper');
const { Task, User, Tag, sequelize } = require('../models');
const {
  createTaskValidator,
  editTaskValidator,
  editTaskProgressValidator,
} = require('../validators/task.validator');

exports.getTaskByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.findAll({
      where: { userId },
      include: [
        {
          model: Tag,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username'],
        },
      ],
      attributes: { exclude: ['userId'] },
    });

    if (!tasks || tasks.length === 0) {
      return handleResponse(res, 404, {
        message: 'No tasks found for the specified user',
      });
    }

    return handleResponse(res, 200, tasks);
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId, {
      include: [
        {
          model: Tag,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username'],
        },
      ],
      attributes: { exclude: ['userId'] },
    });

    if (!task) {
      return handleResponse(res, 404, {
        message: 'Task not found',
      });
    }

    return handleResponse(res, 200, task);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createTask = async (req, res) => {
  const { userId } = req.params;
  const taskData = req.body;

  try {
    await sequelize.transaction(async (t) => {
      const { error, value } = createTaskValidator.validate(taskData);

      if (error) {
        return handleResponse(res, 400, { message: error.details[0].message });
      }

      const { title, description, priority, tags } = value;

      const user = await User.findByPk(userId, { transaction: t });

      if (!user) {
        return handleResponse(res, 404, { message: 'User not found' });
      }

      const task = await Task.create(
        {
          title,
          description,
          priority,
          userId,
        },
        { transaction: t }
      );

      if (tags && tags.length > 0) {
        await task.addTags(tags, { transaction: t });

        await task.reload({
          include: [
            {
              model: Tag,
              as: 'tags',
              attributes: ['id', 'name'],
              through: {
                attributes: [],
              },
            },
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'username'],
            },
          ],
          attributes: { exclude: ['userId'] },
          transaction: t,
        });

        task.tags = task.Tags;
      }

      return handleResponse(res, 201, task);
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.editTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const taskData = req.body;

  try {
    await sequelize.transaction(async (t) => {
      const { error, value } = editTaskValidator.validate(taskData);
      if (error) {
        return handleResponse(res, 400, { message: error.details[0].message });
      }

      const { title, description, priority, tags } = value;

      const task = await Task.findOne({
        where: {
          id: taskId,
          userId: userId,
        },
        transaction: t,
      });

      if (!task) {
        return handleResponse(res, 404, { message: 'Task not found' });
      }

      await task.update(
        {
          title,
          description,
          priority,
        },
        { transaction: t }
      );

      if (tags && tags.length > 0) {
        await task.setTags(tags, { transaction: t });
      }

      await task.reload({
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'username'],
          },
        ],
        attributes: { exclude: ['userId'] },
        transaction: t,
      });

      task.tags = task.Tags;

      return handleResponse(res, 200, task);
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editTaskProgress = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { progress } = req.body;

    const { error } = editTaskProgressValidator.validate({ progress });
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!task) {
      return handleResponse(res, 404, { message: 'Task not found' });
    }

    await task.update({
      progress,
    });

    await task.reload({
      include: [
        {
          model: Tag,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username'],
        },
      ],
      attributes: { exclude: ['userId'] },
    });

    task.tags = task.Tags;

    return handleResponse(res, 200, task);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      const task = await Task.findOne({
        where: {
          id: taskId,
          userId: userId,
        },
        transaction: t,
      });

      if (!task) {
        return handleResponse(res, 404, { message: 'Task not found' });
      }

      await task.destroy({ transaction: t });

      return handleResponse(res, 200, { deletedTask: task });
    });
  } catch (error) {
    return handleServerError(res);
  }
};
