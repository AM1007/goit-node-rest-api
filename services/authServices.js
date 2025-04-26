import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";
import { createVerificationEmail } from "../helpers/createEmailTemplates.js";
import { generateToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const { APP_DOMAIN } = process.env;

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
    if (user.verify) {
      throw HttpError(409, "Email already in use");
    }

    const verificationToken = nanoid();
    await user.update({ verificationToken });
    const verifyEmail = createVerificationEmail(email, verificationToken);

    await sendEmail(verifyEmail);

    return user;
  }

  const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "identicon" });
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...data,
    password: hashPassword,
    avatarURL,
    verificationToken,
    verify: false,
  });

  const verifyEmail = createVerificationEmail(email, verificationToken);
  await sendEmail(verifyEmail);

  return newUser;
};

export const verifyUser = async (verificationToken) => {
  const user = await User.findOne({
    where: { verificationToken },
  });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await user.update({ verify: true, verificationToken: null });

  return user;
};

export const resendVerifyEmail = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  if (!user.verificationToken) {
    const verificationToken = nanoid();
    await user.update({ verificationToken });
  }

  const verifyEmail = createVerificationEmail(email, verificationToken);

  await sendEmail(verifyEmail);
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

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
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

export const updateUserAvatar = async (id, avatarURL) => {
  const user = await findUser({ id });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ avatarURL });
  return user;
};

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
