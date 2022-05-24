const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const UsersRouter = require("./users/users-router");

const server = express();

server.use(express.static(path.resolve(__dirname, "../../frontend/build")));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
