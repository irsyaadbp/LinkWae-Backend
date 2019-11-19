"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.otpModel = Sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    otp: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  }
);
