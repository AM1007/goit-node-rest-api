import User from "../db/models/User.js";

export const registerUser = async (data) => {
  const newUser = await User.create(data);
};
