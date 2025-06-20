import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

// export const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).json({
//       message: 'Login successful',
//       user: {
//         id: existingUser._id,
//         username: existingUser.username,
//       },
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
  
// // authController.js में
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password }); // ❌ दोबारा hash मत करो
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};




// debuge
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // 🐞 [1] Log incoming login request
  console.log("📥 Login Request:", { username, password });

  try {
    // 🐞 [2] Find user from DB
    const existingUser = await User.findOne({ username });
    console.log("🔍 User Found:", existingUser);

    if (!existingUser) {
      console.log("❌ User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    // 🐞 [3] Compare password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    console.log("🔐 Password Match:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("❌ Password incorrect");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 🐞 [4] Generate token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("🔑 JWT Token Created:", token);

    // 🐞 [5] Send success response
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: existingUser._id,
        username: existingUser.username,
      },
      token,
    });

  } catch (err) {
    // 🐞 [6] Catch unexpected errors
    console.error("🔥 Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
