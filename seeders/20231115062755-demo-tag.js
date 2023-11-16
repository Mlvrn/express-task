'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          name: 'Routine',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Learning',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Deadline',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Collaboration',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Communication',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
