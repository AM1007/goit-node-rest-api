import dotenv from "dotenv";

dotenv.config();

const { APP_DOMAIN } = process.env;

export const createVerificationEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${APP_DOMAIN}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
  };
};
