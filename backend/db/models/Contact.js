import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "The contact should have a name",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Contact.sync();
// Contact.sync({alter: true});

export default Contact;
