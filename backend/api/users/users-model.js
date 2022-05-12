const db = require("../../data/db-config");

const getUsers = () => {
  return db("users");
};

const getById = (id) => {
  return db("users").where({ id }).first();
};

const getBy = (filter) => {
  return db("users").where(filter).first();
};

const insert = async (user) => {
  const [id] = await db("users").insert(user);
  return getById(id);
};

const remove = async (id) => {
  const removedUser = await getById(id);
  await db("users").where({ id }).del();
  return removedUser;
};

module.exports = { getUsers, getById, getBy, insert, remove };
