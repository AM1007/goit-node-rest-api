import { useForm } from "react-hook-form";
import styles from "./MyContactsAddForm.module.css";

const MyContactsAddForm = ({ formSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    formSubmit(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>Добавить новый контакт</h2>

      <div className={styles.formGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Ім'я"
          {...register("name", {
            required: "Ім'я обов'язково для заповнення",
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email обов'язкова для заповнення",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
              message: "Будь ласка введіть корректну email адресу",
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Телефон в форматі (xxx) xxx-xxxx"
          {...register("phone", {
            required: "Номер телефону обов'язковий для заповнення",
            pattern: {
              value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
              message: "Телефон повинен бути в форматі (xxx) xxx-xxxx",
            },
          })}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Додавання..." : "Додати контакт"}
      </button>
    </form>
  );
};

export default MyContactsAddForm;
