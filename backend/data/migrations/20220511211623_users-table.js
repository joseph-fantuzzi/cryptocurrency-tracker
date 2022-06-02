exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("first_name").notNullable();
      tbl.string("last_name").notNullable();
      tbl.string("email").notNullable().unique();
      tbl.string("username").notNullable().unique();
      tbl.string("password").notNullable();
    })
    .createTable("favorites", (tbl) => {
      tbl.increments("favorites_id");
      tbl.string("coin_name");
      tbl.integer("user_id").unsigned().notNullable().references("user_id").inTable("users");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites").dropTableIfExists("users");
};
