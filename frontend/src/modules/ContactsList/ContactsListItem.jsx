import { useCallback } from "react";
import styles from "./ContactsListItem.module.css";

const ContactsListItem = ({ id, name, email, phone, onDelete }) => {
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <li className={styles.contactItem}>
      <div className={styles.contactInfo}>
        <div className={styles.contactName}>{name}</div>
        <div className={styles.contactEmail}>Email: {email}</div>
        <div className={styles.contactPhone}>Телефон: {phone}</div>
      </div>
      <button
        onClick={handleDelete}
        type="button"
        className={styles.deleteButton}
      >
        Удалить
      </button>
    </li>
  );
};

export default ContactsListItem;
