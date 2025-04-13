import express from "express";

import authenticate from "../middlewares/authenticate.js";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  favoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getContactsController);

contactsRouter.get("/:id", contactsControllers.getContactByIdController);

contactsRouter.post(
  "/",
  validateBody(contactAddSchema),
  contactsControllers.addContactController
);

contactsRouter.put(
  "/:id",
  validateBody(contactUpdateSchema),
  contactsControllers.updateContactByIdController
);

contactsRouter.delete("/:id", contactsControllers.deleteContactByIdController);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(favoriteSchema),
  contactsControllers.updateStatusContactController
);

export default contactsRouter;
