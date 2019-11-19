"use-strict";

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

exports.isNumber = number => {
  const reg = /^\d+$/;

  return reg.test(number);
};

exports.encrypt = data => {
  return bcrypt.hashSync(data, salt);
};

exports.compareEncrypt = (inputPin, databasePin) => {
  return bcrypt.compareSync(inputPin, databasePin);
};
