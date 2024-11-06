const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const loginCheck = require("../../Middleware/checkLogin");
const User = require("../../Schemas/User/userSchema");

const createJwtTokenForLogOut = (_id) => {
  const token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
    expiresIn: "1s",
  });
  return token;
};

const createJwtToken = (_id) => {
  const token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
    expiresIn: "100h",
  });
  return token;
};

router.get("/get-check-login", loginCheck,  async (req, res) => {
  try {
    res.json({
      status: true,
      status_code: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/auth", async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json("Invalid username or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json("Invalid username or password");
    } else {
      const token = createJwtToken(user._id);
      return res.status(201).json({
        message: "Login Successfully",
        user: { email: user.email, name: user.name },
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/validate-token', async (req, res) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) return res.status(401).send({ message: 'Access denied. No token provided.' });
  const token = bearerToken?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).send({ valid: false, message: 'Invalid token' });
    }
    res.send({ valid: true, userId: decoded.userId });
  } catch (error) {
    res.status(400).send({ valid: false, message: 'Invalid token' });
  }
});

router.get("/logout", loginCheck,  async (req, res) => {
  try {
    const email = req.email.email;
    const token = createJwtTokenForLogOut(email)
    return res.json({
      success: true,
      status_code: 200,
      token
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
