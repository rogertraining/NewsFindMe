import "./config.js"

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/shared/infra/database/knexjs/migrations"
  },
  seeds: {
    directory: "./src/shared/infra/database/knexjs/seeds"
  }
};
