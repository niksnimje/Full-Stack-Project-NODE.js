const UserModel = require("../Model/User.model");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

// Sign Up function
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Ensure no role field is sent
  if (req.body.role) {
    return res.status(400).send({ message: "User should not send role." });
  }

  // Ensure all fields are filled
  if (!name || !email || !password) {
    return res.status(400).send({ message: "Please fill all fields." });
  }

  try {
    // Check if user already exists
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).send({ message: "User already exists." });
    }

    // Hash the password and create user
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(400).send({ message: "Error hashing password." });
      }

      await UserModel.create({ name, email, password: hash });
      res.status(201).send({ message: "User created successfully." });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error." });
  }
};

// Sign In function
const signin = async (req, res) => {
  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    // Check if user exists
    const isExistUser = await UserModel.findOne({ email });
    if (!isExistUser) {
      return res.status(400).json({ message: "User not found. Please sign up." });
    }

    // Compare the password
    bcrypt.compare(password, isExistUser.password, function (err, result) {
      if (err) {
        return res.status(400).json({ message: "Error comparing password." });
      }

      if (result) {
        const { password, ...rest } = isExistUser._doc; // Exclude password from response

        // Sign the JWT token
        jwt.sign({ userData: rest }, process.env.privateKey, { expiresIn: '1h' }, function (err, token) {
          if (err) {
            return res.status(400).json({ message: "Error creating JWT token." });
          }

          // Set the JWT token in cookies
          res.cookie("verificationToken", token, {
            httpOnly: true,  // Protects against XSS attacks
            secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
            maxAge: 3600000  // Set cookie expiry to 1 hour (in ms)
          }).status(200).json({
            message: "Login successful.",
            userData: rest
          });
        });
      } else {
        return res.status(400).json({ message: "Incorrect password." });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { signup, signin };
