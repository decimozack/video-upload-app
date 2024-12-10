import { Sequelize } from 'sequelize';

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'metadata.sqlite', // Path to SQLite file
  logging: false,
});

export default sequelize;
