import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.listContacts({ owner });
  res.json(data);
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.getContact({ id, owner });

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

const addContactController = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(data);
};

const updateContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const data = await contactsService.updateContact({ id, owner }, req.body);

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

const deleteContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.removeContact({ id, owner });

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res
    .status(200)
    .json({ message: `Contact with id=${id} deleted successfully` });
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.updateStatusContact(
    { id, owner },
    req.body
  );

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(data);
};

export default {
  getContactsController: ctrlWrapper(getContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  addContactController: ctrlWrapper(addContactController),
  updateContactByIdController: ctrlWrapper(updateContactByIdController),
  deleteContactByIdController: ctrlWrapper(deleteContactByIdController),
  updateStatusContactController: ctrlWrapper(updateStatusContactController),
};
