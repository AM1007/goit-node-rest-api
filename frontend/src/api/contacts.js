import axios from "axios";

const { VITE_APP_API_URL } = import.meta.env;

const contactsInstance = axios.create({
  baseURL: `${VITE_APP_API_URL}/contacts`,
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get("/");
  return data;
};

export const deleteContactById = async (id) => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};

export const createContact = async (contactData) => {
  const { data } = await contactsInstance.post("/", contactData);
  return data;
};
