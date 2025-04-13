import Contact from "../db/models/Contact.js";

export const listContacts = (query) => Contact.findAll({ where: query });

export const getContactById = (id) => Contact.findByPk(id);

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const addContact = async (data) => {
  try {
    return await Contact.create(data);
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

export const updateContact = async (query, data) => {
  const contact = await Contact.findOne({
    where: query,
  });

  if (!contact) return null;
  await contact.update(data);
  await contact.reload();
  return contact;
};

export const removeContact = (query) =>
  Contact.destroy({
    where: query,
  });

export const updateStatusContact = async (query, data) => {
  const contact = await getContact(query);

  if (!contact) return null;
  const updateData = { favorite: data.favorite };
  return contact.update(updateData, {
    returning: true,
  });
};
