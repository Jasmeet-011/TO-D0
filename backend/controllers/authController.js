const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // Send response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).send({ user: userResponse, token });
  } catch (err) {
    res.status(400).send({
      error: err.message,
      // Handle duplicate key errors
      ...(err.code === 11000 && {
        field: Object.keys(err.keyPattern)[0],
        message: `${Object.keys(err.keyPattern)[0]} already exists`,
      }),
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // Send response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.send({ user: userResponse, token });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

module.exports = { register, login };
