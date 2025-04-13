import express from "express";

import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

export default authRouter;
