const User = require("../models/User"); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Create a new user
const createUser = async (userData) => {
    const { username, email, password } = userData;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10); 
  
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password; 

  return userWithoutPassword;
  };

  const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
        { id: user._id, email: user.email }, 
        "your_jwt_secret",                 
        { expiresIn: "1h" }                
      );
    
      return { token, user: { id: user._id, username: user.username, email: user.email } };
  
  };

// Get all users
const getUsers = async () => {
  return await User.find();
};

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Update user
const updateUser = async (userId, updatedData) => {
  return await User.findByIdAndUpdate(userId, updatedData, { new: true });
};

// Delete user
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};
