const { userModel } = require("../Models/user");
// const { otpModel } = require("../Models/otp");
const {
  isNumber,
  //   encrypt,
  //   compareEncrypt,
  isEmailValid
} = require("../Helpers/helpers");

exports.checkRegisterValue = async (req, res, next) => {
  console.log(req.body, "itu");
  const phone = req.body.phone;
  const pin = req.body.pin;
  const name = req.body.name;
  const email = req.body.email;

  if (phone === "" || phone === null || phone === undefined) {
    return res.json({
      status: "error",
      response: "Phone cant be empty"
    });
  }

  if (!isNumber(phone)) {
    return res.json({
      status: "error",
      response: "Phone must be number"
    });
  }

  if (phone.length > 16 || phone.length < 8) {
    return res.json({
      status: "error",
      response: "Phone can only be between 8-16 characters"
    });
  }

  if (name === "" || name === null || name === undefined) {
    return res.json({
      status: "error",
      response: "Name cant be empty"
    });
  }

  if (email === "" || email === null || email === undefined) {
    return res.json({
      status: "error",
      response: "Email cant be empty"
    });
  }

  if (!isEmailValid(email)) {
    return res.json({
      status: "error",
      response: "Invalid email format"
    });
  }

  const checkEmailuser = await userModel.findOne({
    where: { email }
  });

  if (checkEmailuser) {
    return res.json({
      status: "error",
      response: "Email is exist"
    });
  }

  const checkPhoneUser = await userModel.findOne({
    where: { phone }
  });

  if (checkPhoneUser) {
    return res.json({
      status: "error",
      response: "Phone number is exist"
    });
  }

  if (pin === "" || pin === null || pin === undefined) {
    return res.json({
      status: "error",
      response: "Pin cant be empty"
    });
  }

  if (pin.length !== 6) {
    return res.json({
      status: "error",
      response: "Pin must be have 6 characters"
    });
  }

  if (!isNumber(pin)) {
    return res.json({
      status: "error",
      response: "Pin must be number"
    });
  }

  next();

  //   res.json({
  //     success: "success",
  //     response: req.body
  //   });
};

exports.checkChangeImage = async (req, res, next) => {
  console.log(req.body, "ini");
  const phone = req.body.phone;

  if (phone === "" || phone === null || phone === undefined) {
    return res.json({
      status: "error",
      response: "Phone cant be empty"
    });
  }

  if (!isNumber(phone)) {
    return res.json({
      status: "error",
      response: "Phone must be number"
    });
  }

  if (phone.length > 16 || phone.length < 8) {
    return res.json({
      status: "error",
      response: "Phone can only be between 8-16 characters"
    });
  }

  try {
    const userPhone = await userModel.findOne({ where: { phone } });

    if (userPhone) next();
    else {
      return res.json({
        status: "success",
        response: "User not found"
      });
    }
  } catch (error) {
    return res.json({
      status: "success",
      response: error
    });
  }

  next();
};
