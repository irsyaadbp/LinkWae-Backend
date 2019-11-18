"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.user = Sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    no_telp: {
      type: DataTypes.STRING(16)
    },
    name: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50)
    },
    pin: {
      type: DataTypes.INTEGER(6)
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
    no_rek: {
      type: DataTypes.STRING(20)
    },
    bank: {
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
