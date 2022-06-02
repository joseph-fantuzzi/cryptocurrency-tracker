const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");
const generateToken = require("./token");
const { restricted } = require("./users-middleware");

router.get("/", restricted, (req, res, next) => {
  Users.getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => next(err));
});

router.get("/:id", restricted, (req, res, next) => {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (!user) {
        next({ status: 404, message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => next(err));
});

router.post("/register", (req, res, next) => {
  const { first_name, last_name, email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    first_name,
    last_name,
    email,
    username,
    password: hashedPassword,
  };
  Users.insert(newUser)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  Users.getBy({ username })
    .then((user) => {
      if (!user) {
        next({ status: 404, message: "User not found" });
      } else {
        const success = bcrypt.compareSync(password, user.password);
        if (success) {
          res.json({
            message: `Welcome back, ${user.username}`,
            token: generateToken(user),
          });
        } else {
          next({ status: 401, message: "Invalid credentials" });
        }
      }
    })
    .catch((err) => next(err));
});

router.put("/change", restricted, (req, res, next) => {
  const { username, current_password, new_password } = req.body;
  Users.getBy({ username }).then((user) => {
    const success = bcrypt.compareSync(current_password, user.password);
    if (success) {
      const hashedPassword = bcrypt.hashSync(new_password, 8);
      Users.changePassword(username, hashedPassword)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => next(err));
    } else {
      next({ status: 401, message: "Invalid credentials" });
    }
  });
});

router.delete("/:id", restricted, (req, res, next) => {
  const { id } = req.params;
  Users.remove(id)
    .then((removedUser) => {
      if (!removedUser) {
        next({ status: 404, message: "User not found" });
      } else {
        res.json(removedUser);
      }
    })
    .catch((err) => next(err));
});

router.get("/:id/favorites", restricted, (req, res, next) => {
  const { id } = req.params;
  Users.getFavorites(id)
    .then((favorites) => {
      res.json(favorites);
    })
    .catch((err) => next(err));
});

router.post("/:id/favorites", (req, res, next) => {
  const { id } = req.params;
  const { coin_name } = req.body;
  Users.addFavorites(id, coin_name)
    .then((favorites) => {
      res.json(favorites);
    })
    .catch((err) => next(err));
});

module.exports = router;
