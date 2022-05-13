const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    subject: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
  };
  const options = { expiresIn: "1d" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = generateToken;
