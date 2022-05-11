const express = require("express");

const server = express();

server.use("*", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
