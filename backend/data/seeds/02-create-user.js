const bcrypt = require("bcryptjs");
require("dotenv").config();

const hashedPassword = bcrypt.hashSync(process.env.PASSWORD, 8);

const user = {
  first_name: "admin",
  last_name: "admin",
  email: "admin@admin.com",
  username: "admin",
  password: hashedPassword,
};

exports.seed = async function (knex) {
  return knex("users").insert([user]);
};
