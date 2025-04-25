import express from "express";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
  authVerifySchema,
} from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload("avatar"),
  validateBody(authRegisterSchema),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authControllers.loginController
);

authRouter.get(
  "/current",
  upload("avatar"),
  authenticate,
  authControllers.getCurrentController
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload("avatar"),
  authControllers.updateAvatarController
);

authRouter.post("/logout", authenticate, authControllers.logoutController);

authRouter.post(
  "/verify",
  validateBody(authVerifySchema),
  authControllers.resendVerifyEmailController
);

authRouter.get("/verify/:verificationCode", authControllers.verifyController);

export default authRouter;
