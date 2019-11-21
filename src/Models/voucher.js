"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.voucherModel = Sequelize.define(
  "vouchers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(10)
    },
    type:{
      type: DataTypes.ENUM(["percent", "fixed"])
    },
    amount: {
      type: DataTypes.INTEGER(11)
    },
    date_add: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    },
    date_expired: {
       type: "TIMESTAMP",
       allowNull: false
    }
  },
  {
    timestamps: false
  }
);