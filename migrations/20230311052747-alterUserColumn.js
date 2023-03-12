'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      TRUNCATE "Users" CASCADE;

      ALTER TABLE "Users" 
        DROP COLUMN "createdAt", 
        DROP COLUMN "updatedAt", 
        DROP COLUMN "deletedAt",
        ADD COLUMN avatar VARCHAR(255), 
        ADD COLUMN "createdAt" TIMESTAMPTZ NOT NULL, 
        ADD COLUMN "updatedAt" TIMESTAMPTZ NOT NULL, 
        ADD COLUMN "deletedAt" TIMESTAMPTZ;`)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`
      TRUNCATE "Users" CASCADE;

      ALTER TABLE "Users" 
        DROP COLUMN "createdAt", 
        DROP COLUMN "updatedAt", 
        DROP COLUMN "deletedAt",
        DROP COLUMN avatar, 
        ADD COLUMN "createdAt" TIMESTAMPTZ NOT NULL, 
        ADD COLUMN "updatedAt" TIMESTAMPTZ NOT NULL, 
        ADD COLUMN "deletedAt" TIMESTAMPTZ`)
  }
};
