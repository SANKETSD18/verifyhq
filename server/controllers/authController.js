import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import { User, Event } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;
   

// Login User
export const loginUser  = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User  not found" });
    
    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("✅ Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
    // 3. Generate token (if using JWT)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // 4. Send success response
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Register User
export const registerUser  = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser  = new User({ username, password: hashedPassword });
    await newUser .save();

    res.status(201).json({ message: 'User  created successfully' });
  } catch (err) {
    console.error("❌ Registration error:", err); 
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Add Event
export const addEvent = async (req, res) => {
  const { name, startDate, endDate, contactInfo } = req.body;

  try {
    const newEvent = new Event({ name, startDate, endDate, contactInfo });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
