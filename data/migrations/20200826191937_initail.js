
exports.up = async function(knex) {
  await knex.schema.createTable("zoos", (table) => {
      table.increments("id")
      table.text("name").notNull()
      table.text("address").notNull().unique()
  })

  await knex.schema.createTable("species", (table) => {
    table.increments("id")
    table.text("name").notNull().unique()
  })

  await knex.schema.createTable("animals", (table) => {
    table.increments("id")
    table.text("name").notNull()
    table.integer("species_id")
    .references("id")
    .inTable("species")
  })

  await knex.schema.createTable("zoo_animals", (table) => {
    table.integer("zoo_id").notNull()
    .references("id")
    .inTable("zoos")
    table.integer("animals_id").notNull()
    .references("id")
    .inTable("animals")
    table.date("from_date").notNull().defaultTo(knex.raw("current_timestamp"))
    table.date("to_date")

    table.primary(["zoo_id", "animal_id"])
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("zoo_animals")
  await knex.schema.dropTableIfExists("animals")
  await knex.schema.dropTableIfExists("species")
  await knex.schema.dropTableIfExists("zoos")
}
