import { useCallback } from "react";
import ContactsListItem from "./ContactsListItem";
import styles from "./ContactsList.module.css";

const ContactsList = ({ items = [], onDelete }) => {
  const handleDelete = useCallback(
    (id) => {
      onDelete(id);
    },
    [onDelete]
  );

  const elements = items.map((item) => (
    <ContactsListItem key={item.id} {...item} onDelete={handleDelete} />
  ));

  return <ul className={styles.contactsList}>{elements}</ul>;
};

export default ContactsList;
