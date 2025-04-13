import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const loginController = async (req, res) => {
  const { token } = await authServices.loginUser(req.body);

  res.json({ token });
};

const getCurrentController = (req, res) => {
  const { email, username } = req.user;

  res.json({
    email,
    username,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);

  res.json({ message: "Logout successfully" });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
};
