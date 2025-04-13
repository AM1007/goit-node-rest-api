import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    username: email.username,
    email: newUser.email,
  });
};

export default {
  registerController: ctrlWrapper(registerController),
};
