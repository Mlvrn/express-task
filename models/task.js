'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        as: 'owner',
        foreignKey: {
          name: 'userId',
        },
        onDelete: 'CASCADE',
      });
      Task.belongsToMany(models.Tag, {
        as: 'tags',
        foreignKey: 'taskId',
        through: models.Task_Tags,
      });
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { type: DataTypes.TEXT, defaultValue: '' },
      priority: {
        type: DataTypes.ENUM('high', 'medium', 'low'),
        defaultValue: 'medium',
      },
      progress: {
        type: DataTypes.ENUM('todo', 'in progress', 'done'),
        defaultValue: 'todo',
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
