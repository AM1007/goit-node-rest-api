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

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
};
