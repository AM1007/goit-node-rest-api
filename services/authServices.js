import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import { generateToken } from "../helpers/jwt.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "identicon" });

  const hashPassword = await bcrypt.hash(password, 10);
  return User.create({ ...data, password: hashPassword, avatarURL });
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
    email,
  };

  const token = generateToken(payload);

  await user.update({ token });

  return { token, user };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  if (!user.token) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ token: null });
};
