/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_account", (table) => {
    table.increments("id");
    table.string("first_name");
    table.string("last_name");
    table.string("ethnicity");
    table.enu("gender", ["male", "female", "other"]).notNullable();
    table.string("email").notNullable().unique();
    table.date("birth_date").notNullable();
    table.string("province");
    table.string("district");
    table.string("street");
    table.string("insurance_id");
    table.string("member_id");
    table.string("insurance_provider");
    table.string("password").notNullable();
    table.string("document");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_account");
};
