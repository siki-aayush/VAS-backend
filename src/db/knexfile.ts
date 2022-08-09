import dotenv from "dotenv";
import type { Knex } from "knex";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

// Update with your config settings.
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgres",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
