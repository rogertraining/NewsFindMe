/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id")
    table.string("name").notNullable()
    table.string("email").unique().notNullable()
    table.string("password").notNullable()
    table.date("created_at").defaultTo("now()")
    table.date("updated_at").defaultTo("now()")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("users")
};
