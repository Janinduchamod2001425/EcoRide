import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc: Auth User / set token
// Route: POST /api/users/auth
// @access: public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc: Register new User
// Route: POST /api/users
// @access: public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, contact, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    contact,
    password,
    role,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc: logout User
// Route: POST /api/users/logout
// @access: public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged out" });
});

// @desc: Get User Profile
// Route: GET /api/users/profile
// @access: private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    contact: req.user.contact,
    role: req.user.role,
  };

  res.status(200).json(user);
});

// @desc: Update User Profile
// Route: PUT /api/users/profile
// @access: private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contact = req.body.contact || user.contact;
    user.role = req.body.role || user.role;

    if(req.body.password) {
        user.password = req.body.password
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.contact,
      role: updatedUser.role,
    })

  } else {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
