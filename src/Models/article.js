"use-strict";

const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/connect");

exports.articleModel = Sequelize.define(
  "articles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100)
    },
    image: {
      type: DataTypes.TEXT
    },
    spoiler: {
      type: DataTypes.STRING(200)
    },
    content: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM(["promo", "info"])
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
