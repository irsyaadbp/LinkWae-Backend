"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.userModel = Sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING(16)
    },
    name: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50)
    },
    pin: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM(["value", "another value"])
    },
    balance: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING(10)
    },
    date_add: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    date_update: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
