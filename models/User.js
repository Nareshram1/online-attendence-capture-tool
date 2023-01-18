
// models/User.js

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  uid: String,
  password: String,
  isFaculty:Boolean,
  isStudent:Boolean,
  dateCreated: {
    type: Date,
    default: Date.now
  },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User;