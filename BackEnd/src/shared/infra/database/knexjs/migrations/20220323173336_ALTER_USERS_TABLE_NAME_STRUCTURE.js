/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("name")
    table.string("firstname").notNullable()
    table.string("lastname").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumns(["firstname", "lastname"])
    table.string("name").notNullable()
  })
};
