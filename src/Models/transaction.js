"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.transactionModel = Sequelize.define(
  "transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    invoice_no: {
      type: DataTypes.STRING(15)
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    voucher_code: {
      type: DataTypes.STRING(10)
    },
    category_id: {
      type: DataTypes.INTEGER(2)
    },
    amount: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM(["success","pending", "error"])
    },
    code_number: {
      type: DataTypes.STRING(30)
    },
    detail_transaction: {
      type: DataTypes.TEXT
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
    },
  },
  {
    timestamps: false,
  },
);