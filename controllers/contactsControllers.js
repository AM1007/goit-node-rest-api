import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getContactsController = async (req, res) => {
  const data = await contactsService.getContacts();

  res.json(data);
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

const addContactController = async (req, res) => {
  const data = await contactsService.addContact(req.body);
  res.status(201).json(data);
};

const updateContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.updateContact(id, req.body);

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

const deleteContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.removeContact(id);

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};

export default {
  getContactsController: ctrlWrapper(getContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  addContactController: ctrlWrapper(addContactController),
  updateContactByIdController: ctrlWrapper(updateContactByIdController),
  deleteContactByIdController: ctrlWrapper(deleteContactByIdController),
};
