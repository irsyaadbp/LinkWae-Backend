"use-strict";

const { userModel } = require("../Models/user");
const { otpModel } = require("../Models/otp");
const {
  isNumber,
  encrypt,
  compareEncrypt,
  isEmailValid
} = require("../Helpers/helpers");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

const sid = process.env.SID || "is your twilio sid";
const auth = process.env.AUTH_TOKEN || "is your twillio auth token";

const client = require("twilio")(sid, auth);

const secretKey = process.env.SECRET_KEY || "linkwae";
// Get User
exports.getUser = async (req, res) => {
  try {
    const dataUser = await userModel.findAll({
      attributes: { exclude: ["pin"] }
    });
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
};

exports.getUserByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;

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

    const userByPhone = await userModel.findOne({
      where: { phone },
      attributes: { exclude: ["pin"] }
    });

    if (userByPhone) {
      res.json({
        status: "success",
        response: userByPhone
      });
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

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.user_id;

    const userById = await userModel.findOne({
      where: { id },
      attributes: { exclude: ["pin"] }
    });

    if (userById) {
      // console.log(delete userById.pin);
      res.json({
        status: "success",
        response: userById
      });
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

// Authentication
exports.checkUserAuth = async (req, res) => {
  try {
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

    const userByPhone = await userModel.findOne({
      where: { phone }
    });

    if (userByPhone) status = true;
    else {
      status = false;

      // TODO Call function sendOtpSms
      await sendOtpSms(req, res);

      // await sendOtp(phone, "phone", res);
    }

    res.json({
      status: "success",
      response: {
        phone,
        isRegistered: status
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

// TODO Delete function and route sendOtp, cause you have sendOtpEmail adn sendOtpSms
const sendOtp = async (receiver, type, res) => {
  try {
    // const phone = req.body.phone;

    const oldOtp = await otpModel.findOne({
      where: { receiver }
    });

    if (oldOtp) {
      await otpModel.destroy({
        where: { receiver }
      });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000);

    const newOtpEncrypt = encrypt(`${newOtp}`);
    console.log(newOtpEncrypt);

    const insertNewOtp = await otpModel.create(
      {
        otp: newOtpEncrypt,
        receiver
      },
      {
        fields: ["otp", "receiver"]
      }
    );

    if (insertNewOtp) {
      console.log(newOtp);

      if (type === "phone") {
        // sendSMS(receiver, newOtp);
        console.log("kirim sms dengan otp " + newOtp + " ke " + receiver);
      } else {
        // sendEmail(receiver, newOtp);
        console.log("kirim email dengan otp " + newOtp + " ke " + receiver);
      }

      setTimeout(async () => {
        await otpModel.destroy({
          where: { otp: newOtpEncrypt }
        });
      }, 180000);

      // res.json({
      //   status: "success",
      //   response: {
      //     newOtp,
      //     newOtpEncrypt
      //   }
      // });
    }

    // const
  } catch (error) {
    return res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.register = async (req, res) => {
  console.log(req.body.phone);
  try {
    const phone = req.body.phone;
    const pin = req.body.pin;
    const name = req.body.name;
    const email = req.body.email;
    // console.log(req.headers.host);

    const image = req.file
      ? "/images/uploads/" + req.file.filename
      : "/images/avatar.png";

    // return;

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

    const checkPhoneUser = await userModel.findOne({
      where: { phone }
    });

    if (checkPhoneUser) {
      return res.json({
        status: "error",
        response: "Phone number is exist"
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
        response: "Email number is exist"
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

    const newUser = await userModel.create(
      {
        phone,
        pin: encrypt(pin),
        image,
        name,
        email,
        type: "B"
      },
      {
        fields: ["phone", "pin", "name", "email", "image", "type"]
      }
    );

    if (newUser) {
      const newUserData = await userModel.findOne({
        where: { phone }
      });

      const token = jwt.sign(
        {
          id: newUserData.id,
          name: newUserData.name,
          phone: newUserData.phone,
          email: newUserData.email
        },
        secretKey
      );

      return res.json({
        status: "success",
        response: {
          user: {
            id: newUserData.id,
            name: newUserData.name,
            phone: newUserData.phone,
            email: newUserData.email,
            image: newUserData.image
          },
          jwt: token
        }
      });
    } else {
      return res.json({
        status: "error",
        response: "Register failed"
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

    if (phone.length > 16 || phone.length < 10) {
      return res.json({
        status: "error",
        response: "Phone can only be between 9-16 characters"
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
            jwt: token
          }
        });
      } else {
        res.json({
          status: "error",
          response: "Pin not match"
        });
      }
    } else {
      return res.json({
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

// TODO Delete function and route forgotPin, cause you have sendOtpEmail
exports.forgotPin = async (req, res) => {
  try {
    const email = req.body.email;

    const userByEmail = await userModel.findOne({ where: { email } });

    if (userByEmail) {
      sendOtp(email, "email", res);

      res.json({
        status: "success",
        response: {
          message: "Otp reset password send",
          user: {
            id: userByEmail.id,
            name: userByEmail.name,
            phone: userByEmail.phone,
            email: userByEmail.email,
            image: userByEmail.image
          }
        }
      });
    } else {
      return res.json({
        status: "error",
        response: "Email not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.resetPin = async (req, res) => {
  try {
    const email = req.body.email;
    const pin = req.body.pin;

    if (email === "" || email === null || email === undefined) {
      return res.json({
        status: "error",
        response: "Email can't be empty"
      });
    }

    if (!isEmailValid(email)) {
      return res.json({
        status: "error",
        response: "Invalid email format"
      });
    }

    const userByEmail = await userModel.findOne({ where: { email } });
    if (!userByEmail) {
      return res.json({
        status: "error",
        response: "Email not found"
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

    const insertNewPin = await userModel.update(
      {
        password: encrypt(pin)
      },
      { where: { email } }
    );

    if (insertNewPin) {
      res.json({
        status: "success",
        response: {
          message: "Success change pin",
          user: {
            id: userByEmail.id,
            name: userByEmail.name,
            phone: userByEmail.phone,
            email: userByEmail.email,
            image: userByEmail.image
          }
        }
      });
    } else {
      return res.json({
        status: "error",
        response: "Failed change pin"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

// TODO Delete function and route sendOtpVerifyEmail, cause you have sendOtpEmail
exports.sendOtpVerifyEmail = async (req, res) => {
  try {
    const email = req.body.email;
    if (email === "" || email === null || email === undefined) {
      return res.json({
        status: "error",
        response: "Email can't be empty"
      });
    }

    if (!isEmailValid(email)) {
      return res.json({
        status: "error",
        response: "Invalid email format"
      });
    }

    const userByEmail = await userModel.findOne({ where: { email } });

    if (!userByEmail) {
      return res.json({
        status: "error",
        response: "Email not found"
      });
    }

    await sendOtp(email, "email", res);

    res.json({
      status: "success",
      response: {
        message: "Otp verify email send",
        user: {
          id: userByEmail.id,
          name: userByEmail.name,
          phone: userByEmail.phone,
          email: userByEmail.email,
          image: userByEmail.image
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.updateVerifyEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    if (email === "" || email === null || email === undefined) {
      return res.json({
        status: "error",
        response: "Email can't be empty"
      });
    }

    if (!isEmailValid(email)) {
      return res.json({
        status: "error",
        response: "Invalid email format"
      });
    }

    const userByEmail = await userModel.findOne({ where: { email } });

    if (!userByEmail) {
      return res.json({
        status: "error",
        response: "Email not found"
      });
    }

    const userOtp = await otpModel.findOne({ where: { receiver: email } });

    if (compareEncrypt(otp, userOtp.otp)) {
      otpModel.destroy({
        where: { otp: userOtp.otp }
      });

      const verifiedEmail = await userModel.update(
        { type: "FA" },
        { where: { email } }
      );

      if (verifiedEmail) {
        res.json({
          status: "success",
          response: "Verify email success"
        });
      }
    } else {
      return res.json({
        status: "error",
        response: "Otp not match"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.requestTokenUser = async (req, res) => {
  try {
    const phone = req.body.phone;
    const pin = req.body.pin;

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

    if (pin === "" || pin === null || pin === undefined) {
      return res.json({
        status: "error",
        response: "Pin can't be empty"
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

    const userByPhone = await userModel.findOne({ where: { phone } });

    if (userByPhone) {
      const randomToken = "99" + Math.floor(1000000 + Math.random() * 90000000);

      const insertToken = await userModel.update(
        { token: encrypt(randomToken) },
        { where: { phone } }
      );

      if (insertToken) {
        setTimeout(async () => {
          await userModel.update({ token: null }, { where: { phone } });
          console.log("token dihapus");
        }, 180000);

        res.json({
          status: "success",
          response: {
            token: randomToken,
            user: {
              id: userByPhone.id,
              name: userByPhone.name,
              phone: userByPhone.phone,
              email: userByPhone.email,
              image: userByPhone.image
            }
          }
        });
      }
    } else {
      res.json({
        status: "error",
        response: "Phone is not exists"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.sendOtpEmail = async (req, res) => {
  try {
    const email = req.body.email;

    const otp = await generateOtp(email, res);

    if (otp.success) {
      const type = req.body.type;

      const msg = type === "verify" ? "Verify Your Account" : "Reset Password";

      console.log(type, "masuk");
      const subject = "This is Your Otp Code to " + msg;
      const content = subject + " is " + otp.code;

      // TODO If in upload please to open
      // await sendEmail(email, subject, content);

      console.log(content + " to " + email);

      res.json({
        status: "success",
        response: "Successfully sent otp code to email " + email
      });
    } else {
      res.json({
        status: "error",
        response: "Failed send otp, please try again later"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

const sendOtpSms = async (req, res) => {
  try {
    const phone = req.body.phone;

    console.log(phone, "hai");
    const otp = await generateOtp(phone);

    if (otp.success) {
      // TODO If in upload please to open
      // await sendSMS(phone, otp.code);

      console.log(otp.code + " to " + phone);

      // res.json({
      //   status: "success",
      //   response: "Successfully sent otp code to phone " + phone
      // });

      // return true;
    } else {
      return res.json({
        status: "error",
        response: "Failed send otp, please try again later"
      });
      // return false;
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      response: error
    });
  }
};

const generateOtp = async receiver => {
  try {
    const oldOtp = await otpModel.findOne({
      where: { receiver }
    });

    if (oldOtp) {
      await otpModel.destroy({
        where: { receiver }
      });
    }
    const newOtp = 123456;
    // const newOtp = Math.floor(100000 + Math.random() * 900000);

    const newOtpEncrypt = encrypt(`${newOtp}`);
    console.log(newOtpEncrypt);

    const insertNewOtp = await otpModel.create(
      {
        otp: newOtpEncrypt,
        receiver
      },
      {
        fields: ["otp", "receiver"]
      }
    );

    if (insertNewOtp) {
      setTimeout(async () => {
        await otpModel.destroy({
          where: { otp: newOtpEncrypt }
        });
      }, 180000);

      return { success: true, code: newOtp };
    } else return { success: false };
  } catch (error) {
    return { success: false };
  }
};

const sendSMS = (phone, otp) => {
  client.messages
    .create({
      body: "Your OTP number is " + otp + ", this OTP only valid in 3 minutes",
      from: process.env.TWILIO_NUMBER,
      to: "+62" + phone
    })
    .then(message => console.log(message.sid));
};

const sendEmail = (email, subject, content) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "is your sendgrid api key");
  const msg = {
    to: email,
    from: "admin@linkwae.id",
    subject: subject,
    text: content,
    html: content
  };
  sgMail.send(msg);
};

exports.verifyOtp = async (req, res) => {
  console.log("masuk ");
  try {
    const receiver = req.body.user;
    const otp = req.body.otp;

    if (receiver === "" || receiver === null || receiver === undefined) {
      return res.json({
        status: "error",
        response: "User cant be empty, user can be email or phone number"
      });
    }

    const userOtp = await otpModel.findOne({ where: { receiver } });

    if (userOtp) {
      if (compareEncrypt(otp, userOtp.otp)) {
        otpModel.destroy({
          where: { otp: userOtp.otp }
        });
        return res.json({
          status: "error",
          response: "Otp code is valid"
        });
      } else {
        return res.json({
          status: "error",
          response: "Otp not match"
        });
      }
    } else {
      return res.json({
        status: "error",
        response: "Your OTP is expired, please request OTP again"
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.changeImage = async (req, res) => {
  try {
    const phone = req.body.phone;
    const image = req.file
      ? "/images/uploads/" + req.file.filename
      : "/images/avatar.png";

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

    console.log(image);

    const changeNewImage = await userModel.update(
      {
        image
      },
      { where: { phone } }
    );

    if (changeNewImage) {
      const newUser = await userModel.findOne({ where: { phone } });

      res.json({
        status: "success",
        response: {
          message: "Success change Image",
          user: {
            id: newUser.id,
            name: newUser.name,
            phone: newUser.phone,
            email: newUser.email,
            image: newUser.image
          }
        }
      });
    } else {
      return res.json({
        status: "error",
        response: "Failed change image"
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      response: error
    });
  }
};
