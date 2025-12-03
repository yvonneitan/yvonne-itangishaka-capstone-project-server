import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default {
  client: "sqlite3",
  connection: {
    filename: "./actrack.db"
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations'
  }
};
