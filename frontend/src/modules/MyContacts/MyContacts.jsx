import { useState, useEffect, useCallback } from "react";
import MyContactsAddForm from "../MyContactsAddForm/MyContactsAddForm";
import ContactsList from "../ContactsList/ContactsList";
import styles from "./MyContacts.module.css";

import * as contactsRequest from "../../api/contacts";

const MyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await contactsRequest.getAllContacts();
        setContacts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const addContact = useCallback(async (data) => {
    try {
      setLoading(true);
      const newContact = await contactsRequest.createContact(data);
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteContact = useCallback(async (id) => {
    try {
      setLoading(true);
      await contactsRequest.deleteContactById(id);
      setContacts((prevState) => prevState.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менеджер контактів</h1>

      {loading && <p className={styles.loading}>Завантаження...</p>}
      {error && <p className={styles.error}>Помилка: {error}</p>}

      <div className={styles.formSection}>
        <MyContactsAddForm formSubmit={addContact} />
      </div>

      <div className={styles.listSection}>
        <ContactsList items={contacts} onDelete={deleteContact} />
      </div>
    </div>
  );
};

export default MyContacts;
