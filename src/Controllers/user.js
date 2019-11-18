"use-strict";

// const Sequelize = require('sequelize');
const {user} = require("../Models/user");

exports.getUser = async (req, res) => {
  try {
    const dataUser = await user.findAll();
    res.json({
      data: dataUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};
