import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Event Schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  contactInfo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


// Export both models
const User = mongoose.model('User', userSchema, 'admin_login');
const Event = mongoose.model('Event', eventSchema);

export { User, Event };
