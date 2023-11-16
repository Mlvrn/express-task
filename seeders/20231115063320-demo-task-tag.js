'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Task_Tags',
      [
        { taskId: 1, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
        { taskId: 1, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
        { taskId: 1, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
        { taskId: 2, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
        { taskId: 2, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
        { taskId: 3, tagId: 4, createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Task_Tags', null, {});
  },
};
