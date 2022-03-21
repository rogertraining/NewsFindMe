/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("news", (table) => {
    table.uuid("id").primary()
    table.string("title").notNullable()
    table.string("link").notNullable()
    table.string("image_url").notNullable()

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex)  {
  await knex.schema.dropTable("news") 
};
