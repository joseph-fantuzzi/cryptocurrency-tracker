require("dotenv").config();

const sharedConfig = {
  client: "pg",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.PROD_DATABASE_URL,
  },
};
