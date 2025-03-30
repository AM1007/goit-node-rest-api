import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

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

export default contactsRouter;
