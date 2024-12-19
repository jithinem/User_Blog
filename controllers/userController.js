const userService = require("../services/userService"); // Import the user service

// Controller for creating a new user
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { token, user } = await userService.loginUser(email, password);
      res.status(200).json({
        message: "Login successful",
        user,
        token,  
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
// Controller for getting all users
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Controller for getting a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Controller for updating a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser); 
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Controller for deleting a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
