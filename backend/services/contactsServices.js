import Contact from "../db/models/Contact.js";

export const listContacts = (query) => Contact.findAll({ where: query });

export const getContactById = (id) => Contact.findByPk(id);

export const addContact = (data) => Contact.create(data);

export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await Contact.destroy({
    where: { id },
  });
  return contact;
};

export const updateStatusContact = async (id, data) => {
  const contact = await getContactById(id);

  if (!contact) return null;
  const updateData = { favorite: data.favorite };
  return contact.update(updateData, {
    returning: true,
  });
};
