import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required and must be unique.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required and must be unique.'],
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex.
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 8, // Minimum password length.
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExpires: {
    type: Date,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpires: {
    type: Date,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
