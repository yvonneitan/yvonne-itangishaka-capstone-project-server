import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8"
  },
  migrations: {
    directory: './migrations', // The correct path to your migrations folder
  },
  seeds: {
    directory: './seeds', // Optional: If you are using seeds
  }
};
