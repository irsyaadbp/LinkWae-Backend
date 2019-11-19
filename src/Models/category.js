"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.categoryModel = Sequelize.define(
  "categories",
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
    },
    parent_category:{
      type: DataTypes.ENUM(["ppob", "merchants","balance"])
    }
  },
  {
    timestamps: false
  }
);