'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Task 1',
          description: 'Description for Task 1',
          priority: 'high',
          progress: 'done',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: 'Task 2',
          description: 'Description for Task 2',
          priority: 'medium',
          progress: 'in progress',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: 'Task 3',
          description: 'Description for Task 4',
          priority: 'low',
          progress: 'done',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
