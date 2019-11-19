"use-strict";

const { userModel } = require("../Models/user");
const { otpModel } = require("../Models/otp");
const { isNumber, encrypt, compareEncrypt } = require("../Helpers/helpers");
const jwt = require("jsonwebtoken");
(secretKey = process.env.SECRET_KEY || "linkwae"),
  // Get User
  (exports.getUser = async (req, res) => {
    try {
      const dataUser = await userModel.findAll();
      res.json({
        status: "success",
        response: dataUser
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        response: error
      });
    }
  });

exports.getUserByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    const userByPhone = await userModel.findOne({
      where: { phone }
    });

    res.json({
      status: "success",
      response: userByPhone
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const userById = userModel.findOne({ where: { user_id } });

    res.json({
      status: "success",
      response: userById
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

// Authentication
exports.checkUserAuth = async (req, res) => {
  try {
    const phone = req.body.phone;

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

    const userByPhone = await userModel.findOne({
      where: { phone }
    });

    if (userByPhone) status = true;
    else status = false;

    res.json({
      status: "success",
      response: {
        phone,
        status
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

// exports.verifyOtp = async (req, res) => {
//   try {
//     const user_id = req.body.user_id;
//     const oldOtp = await otpModel.findOne({
//       where: { user_id }
//     });

//     if (oldOtp) {
//       const deleteOld = otpModel.destroy({
//         where: { user_id }
//       });
//     }

//   } catch (error) {}
// };

exports.register = async (req, res) => {
  try {
    const phone = req.body.phone;
    const pin = req.body.pin;

    if (phone === "" || phone === null) {
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

    const checkUser = await userModel.findOne({
      where: { phone }
    });

    if (checkUser) {
      return res.json({
        status: "error",
        response: "Phone number is exist"
      });
    }

    if (pin === "" || pin === null) {
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

    const newUser = await userModel.create(
      {
        phone,
        pin: encrypt(pin),
        type: "B"
      },
      {
        fields: ["phone", "pin", "type"]
      }
    );

    if (newUser) {
      const newUserData = await userModel.findOne({
        where: { phone }
      });
      return res.json({
        status: "success",
        response: {
          id: newUserData.id,
          name: newUserData.name,
          phone: newUserData.phone,
          email: newUserData.email
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.login = async (req, res) => {
  try {
    const phone = req.body.phone;
    const pin = req.body.pin;

    if (phone === "" || phone === null) {
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

    if (phone.length > 16 || phone.length < 10) {
      return res.json({
        status: "error",
        response: "Phone can only be between 9-16 characters"
      });
    }

    if (pin === "" || pin === null) {
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

    const userByPhone = await userModel.findOne({
      where: { phone }
    });

    if (userByPhone) {
      if (compareEncrypt(pin, userByPhone.pin)) {
        const token = jwt.sign(
          {
            id: userByPhone.id,
            name: userByPhone.name,
            phone: userByPhone.phone,
            email: userByPhone.email
          },
          secretKey
        );

        res.json({
          status: "success",
          response: {
            user: {
              id: userByPhone.id,
              name: userByPhone.name,
              phone: userByPhone.phone,
              email: userByPhone.email,
              image: userByPhone.image
            },
            token
          }
        });
      } else {
        res.json({
          status: "error",
          response: "Password not match"
        });
      }
    } else {
      res.json({
        status: "error",
        response: "User not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};
