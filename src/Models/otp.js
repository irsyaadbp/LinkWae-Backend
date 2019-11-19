"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.otpModel = Sequelize.define(
  "otps",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    otp: {
      type: DataTypes.TEXT
    },
    receiver: {
      type: DataTypes.STRING(20)
    }
  },
  {
    timestamps: false
  }
);
