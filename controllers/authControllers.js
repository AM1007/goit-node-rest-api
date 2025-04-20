import fs from "node:fs/promises";
import path from "node:path";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const postersDir = path.resolve("public", "avatars");

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentController = (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Avatar is required");
  }

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(postersDir, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  const { id } = req.user;
  const user = await authServices.updateUserAvatar(id, avatarURL);

  res.json({
    avatarURL: user.avatarURL,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);

  res.status(204).send();
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
