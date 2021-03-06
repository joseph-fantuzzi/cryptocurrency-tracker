const db = require("../../data/db-config");

const getUsers = () => {
  return db("users");
};

const getById = (user_id) => {
  return db("users").where({ user_id }).first();
};

const getBy = (filter) => {
  return db("users").where(filter).first();
};

const insert = async (user) => {
  const [id] = await db("users").insert(user).returning("user_id");
  return getById(id.user_id);
};

const changePassword = async (username, password) => {
  const count = await db("users").where({ username }).update({ password });
  if (count > 0) {
    return getBy({ username });
  }
};

const remove = async (user_id) => {
  const removedUser = await getById(user_id);
  await db("users").where({ user_id }).del();
  return removedUser;
};

const getFavorites = async (user_id) => {
  const data = await db("users as u")
    .join("favorites as f", "u.user_id", "f.user_id")
    .select("u.user_id", "u.username", "f.favorites_id", "f.coin_name", "f.coin_id")
    .orderBy("f.coin_name", "asc")
    .where("u.user_id", user_id);
  return data;
};

const addFavorites = async (user_id, coin_name, coin_id) => {
  await db("favorites").insert({ coin_name, coin_id, user_id });
  return getFavorites(user_id);
};

const removeFavorites = async (favorites_id) => {
  await db("favorites").where({ favorites_id }).del();
};

module.exports = {
  getUsers,
  getById,
  getBy,
  insert,
  changePassword,
  remove,
  getFavorites,
  addFavorites,
  removeFavorites,
};
