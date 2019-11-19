"use-strict";

const bcrypt = require("bcrypt");

exports.isNumber = number => {
  const reg = /^\d+$/;

  return reg.test(number);
};

exports.isEmailValid = email => {
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

exports.encrypt = data => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
};

exports.compareEncrypt = (inputPin, databasePin) => {
  return bcrypt.compareSync(inputPin, databasePin);
};
