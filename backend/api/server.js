const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use("/api/users", UsersRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
