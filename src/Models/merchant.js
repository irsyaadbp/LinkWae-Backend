"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.merchants = Sequelize.define(
  "merchants",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    address: {
      type: DataTypes.TEXT
    },
    detail: {
      type: DataTypes.TEXT
    },
    longitude: {
      type: DataTypes.STRING(20)
    },
    latitude: {
      type: DataTypes.STRING(20)
    }
  },
  {
    timestamps: false
  }
);