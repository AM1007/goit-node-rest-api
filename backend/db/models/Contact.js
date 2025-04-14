import { DataTypes } from "sequelize";
import { EMAIL_PATTERN, PHONE_PATTERN } from "../../constants/contacts.js";

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
    validate: {
      is: EMAIL_PATTERN,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: PHONE_PATTERN,
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Contact;
