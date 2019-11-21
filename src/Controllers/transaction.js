"use-strict";

const { transactionModel } = require("../Models/transaction");
const { categoryModel } = require("../Models/category");
const { compareEncrypt } = require("../Helpers/helpers");
const { userModel } = require("../Models/user");
// const { voucherModel } = require("../Models/voucher");

function makeInvoiceNo(length, parent_category) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (parent_category === "merchants") {
    return "M" + result;
  } else if (parent_category === "donation") {
    return "D" + result;
  } else if (parent_category === "ppob") {
    return "P" + result;
  } else if (parent_category === "balance") {
    return "B" + result;
  }
}

exports.updateSaldoMinus = async (dataTransaction, res) => {
  const user_id = dataTransaction.user_id;
  const amount = dataTransaction.amount;

  const userSaldo = await userModel.findOne({
    where: { id: user_id }
  });

  updateBalance = parseInt(userSaldo.balance) - parseInt(amount);
  await userModel.update(
    {
      balance: updateBalance
    },
    {
      where: { id: user_id }
    }
  );
};

exports.updateSaldoPlus = async (dataTransaction, res) => {
  const user_id = dataTransaction.user_id;
  const amount = dataTransaction.amount;

  const userSaldo = await userModel.findOne({
    where: { id: user_id }
  });

  updateBalance = parseInt(userSaldo.balance) + parseInt(amount);
  await userModel.update(
    {
      balance: updateBalance
    },
    {
      where: { id: user_id }
    }
  );
};

exports.postMerchants = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      where: { name: req.category_name }
    });
    const parent_category = category.parent_category;
    const category_id = category.id;
    const invoice_no = makeInvoiceNo(7, parent_category);
    const voucher_code = req.voucher_code ? req.voucher_code : null;
    const amount = req.amount;
    const user_id = req.user_id;

    //Validasi saldo
    const checkSaldo = await userModel.findOne({
      where: { id: user_id }
    });
    if (checkSaldo.balance < parseInt(amount)) {
      return res.json({
        status: "error",
        response: "The balance is not sufficient"
      });
    }

    //validasi voucher
    if (voucher_code) {
      if (voucher_code.length > 10) {
        return res.json({
          status: "error",
          response: "Incorrect Voucher Code"
        });
      }
    }
    //validasi invoice_no
    const checkInvoice = await transactionModel.findOne({
      where: { invoice_no: invoice_no }
    });

    if (checkInvoice) {
      return this.postMerchants(req, res);
    }

    const newMerchants = await transactionModel.create({
      invoice_no: invoice_no,
      user_id: user_id,
      voucher_code: voucher_code,
      category_id: category_id,
      amount: amount,
      status: "success",
      detail_transaction: req.detail_transaction
    });
    if (newMerchants) {
      this.updateSaldoMinus(newMerchants, res);
      transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
      categoryModel.hasMany(transactionModel, { foreignKey: "category_id" });

      const newMerchantsData = await transactionModel.findOne({
        where: { invoice_no: invoice_no },
        include: [
          {
            model: categoryModel,
            where: { id: category_id }
          }
        ]
      });
      return res.json({
        status: "success",
        response: {
          newMerchantsData
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

exports.postDonation = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      where: { name: req.category_name }
    });
    const parent_category = category.parent_category;
    const category_id = category.id;
    const invoice_no = makeInvoiceNo(7, parent_category);
    const user_id = req.user_id;
    const amount = req.amount;

    //Validasi saldo
    const checkSaldo = await userModel.findOne({
      where: { id: user_id }
    });

    if (checkSaldo.balance < parseInt(amount)) {
      return res.json({
        status: "error",
        response: "The balance is not sufficient"
      });
    }

    //validasi invoice_no
    const checkInvoice = await transactionModel.findOne({
      where: { invoice_no: invoice_no }
    });

    if (checkInvoice) {
      return this.postDonation(req, res);
    }

    const newDonation = await transactionModel.create({
      invoice_no: invoice_no,
      user_id: user_id,
      category_id: category_id,
      amount: amount,
      status: "success",
      detail_transaction: req.detail_transaction
    });
    this.updateSaldoMinus(newDonation, res);
    if (newDonation) {
      transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
      categoryModel.hasMany(transactionModel, { foreignKey: "category_id" });

      const newDonationData = await transactionModel.findOne({
        where: { invoice_no: invoice_no },
        include: [
          {
            model: categoryModel,
            where: { id: category_id }
          }
        ]
      });
      return res.json({
        status: "success",
        response: {
          newDonationData
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

exports.postPpob = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      where: { name: req.category_name }
    });
    const parent_category = category.parent_category;
    const category_id = category.id;
    const invoice_no = makeInvoiceNo(7, parent_category);
    const voucher_code = req.voucher_code ? req.voucher_code : null;
    const code_number = req.code_number;
    const user_id = req.user_id;
    const amount = req.amount;

    //Validasi saldo
    const checkSaldo = await userModel.findOne({
      where: { id: user_id }
    });
    console.log(checkSaldo.balance);

    if (checkSaldo.balance < parseInt(amount)) {
      return res.json({
        status: "error",
        response: "The balance is not sufficient"
      });
    }

    //validasi code_number
    if (
      code_number === "" ||
      code_number === null ||
      code_number === undefined
    ) {
      return res.json({
        status: "error",
        response: "The destination number or token cant be empty"
      });
    }

    //validasi voucher
    if (voucher_code) {
      if (voucher_code.length > 10) {
        return res.json({
          status: "error",
          response: "Incorrect Voucher Code"
        });
      }
    }

    //validasi invoice_no
    const checkInvoice = await transactionModel.findOne({
      where: { invoice_no: invoice_no }
    });

    if (checkInvoice) {
      return this.postPpob(req, res);
    }

    const newPpob = await transactionModel.create({
      invoice_no: invoice_no,
      user_id: user_id,
      voucher_code: voucher_code,
      category_id: category_id,
      amount: amount,
      status: "pending",
      code_number: req.code_number,
      detail_transaction: req.detail_transaction
    });
    if (newPpob) {
      this.updateSaldoMinus(newPpob, res);
      transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
      categoryModel.hasMany(transactionModel, { foreignKey: "category_id" });

      const newPpobData = await transactionModel.findOne({
        where: { invoice_no: invoice_no },
        include: [
          {
            model: categoryModel,
            where: { id: category_id }
          }
        ]
      });
      return res.json({
        status: "success",
        response: {
          newPpobData
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

exports.postBalance = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      where: { name: req.category_name }
    });
    const parent_category = category.parent_category;
    const category_name = category.name;
    const category_id = category.id;
    const user_id = req.user_id;
    const invoice_no = makeInvoiceNo(7, parent_category);
    const code_number = req.code_number;
    const voucher_code = req.voucher_code ? req.voucher_code : null;
    const amount = req.amount;

    //validasi code_number
    if (
      code_number === "" ||
      code_number === null ||
      code_number === undefined
    ) {
      return res.json({
        status: "error",
        response: "The destination number cant be empty"
      });
    }

    //validasi voucher
    if (voucher_code) {
      if (voucher_code.length > 10) {
        return res.json({
          status: "error",
          response: "Incorrect Voucher Code"
        });
      }
    }

    //validasi invoice_no
    const checkInvoice = await transactionModel.findOne({
      where: { invoice_no: invoice_no }
    });

    if (checkInvoice) {
      return this.postBalance(req, res);
    }

    const codeUserNumber = await userModel.findOne({
      where: { phone: code_number }
    });

    if (category_name === "send") {
      //Validasi saldo
      const checkSaldo = await userModel.findOne({
        where: { id: user_id }
      });
      console.log(checkSaldo.balance);

      if (checkSaldo.balance < parseInt(amount)) {
        return res.json({
          status: "error",
          response: "The balance is not sufficient"
        });
      }

      if (codeUserNumber) {
        const sendUserData = await transactionModel.create({
          user_id: user_id,
          voucher_code: voucher_code,
          category_id: category_id,
          amount: amount,
          status: "success",
          code_number: codeUserNumber.id,
          detail_transaction: req.detail_transaction
        });
        if (sendUserData) {
          this.updateSaldoMinus(sendUserData, res);
          const receiveUserData = await transactionModel.create({
            user_id: codeUserNumber.id,
            voucher_code: voucher_code,
            category_id: category_id,
            amount: amount,
            status: "success",
            code_number: user_id,
            detail_transaction: req.detail_transaction
          });
          if (receiveUserData) {
            this.updateSaldoPlus(receiveUserData, res);
            return res.json({
              status: "success",
              response: {
                transaction: {
                  from: parseInt(user_id),
                  to: codeUserNumber.id,
                  amount: amount,
                  status: req.status,
                  detail_transaction: req.detail_transaction
                }
              }
            });
          }
        }
      } else {
        res.json({
          status: "error",
          response: "The destination number is not a LinkWae user"
        });
      }
    } else if (category_name === "topup") {
      if (codeUserNumber) {
        const id = codeUserNumber.id;
        if (user_id == id) {
          const newTopup = await transactionModel.create({
            invoice_no: invoice_no,
            user_id: user_id,
            voucher_code: voucher_code,
            category_id: category_id,
            amount: amount,
            status: "success",
            code_number: codeUserNumber.id,
            detail_transaction: req.detail_transaction
          });
          if (newTopup) {
            this.updateSaldoPlus(newTopup, res);
            transactionModel.belongsTo(categoryModel, {
              foreignKey: "category_id"
            });
            categoryModel.hasMany(transactionModel, {
              foreignKey: "category_id"
            });

            const newTopupData = await transactionModel.findOne({
              where: { invoice_no: invoice_no },
              include: [
                {
                  model: categoryModel,
                  where: { id: category_id }
                }
              ]
            });
            return res.json({
              status: "success",
              response: {
                newTopupData
              }
            });
          }
        } else {
          res.json({
            status: "error",
            response: "Incorrect destination number"
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.getHistoryAll = async (req, res) => {
  try {
    transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
    categoryModel.hasMany(transactionModel, { foreignKey: "id" });

    const dataHistoryAll = await transactionModel.findAll({
      include: [
        {
          model: categoryModel,
          require: true
        }
      ]
    });
    return res.json({
      status: "success",
      response: dataHistoryAll
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.getHistoryByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
    categoryModel.hasMany(transactionModel, { foreignKey: "id" });

    const dataHistory = await transactionModel.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: categoryModel,
          require: true
        }
      ]
    });
    return res.json({
      status: "success",
      response: dataHistory
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.postTransaction = async (req, res) => {
  try {
    const pin = req.body.pin;
    const user_id = req.body.user_id;

    //validasi pin
    const userById = await userModel.findOne({
      where: { id: user_id }
    });
    const category = await categoryModel.findOne({
      where: { name: req.body.category_name }
    });

    if (userById) {
      if (compareEncrypt(pin, userById.pin)) {
        if (category.parent_category === "merchants") {
          return this.postMerchants(req.body, res);
        } else if (category.parent_category === "donation") {
          return this.postDonation(req.body, res);
        } else if (category.parent_category === "ppob") {
          return this.postPpob(req.body, res);
        } else if (category.parent_category === "balance") {
          return this.postBalance(req.body, res);
        }
      } else {
        res.json({
          status: "error",
          response: "Pin not match"
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

exports.updateTransaction = async (req, res) => {
  try {
    const invoice_no = req.params.invoice_no;
    const status = req.body.status;
    transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
    categoryModel.hasMany(transactionModel, { foreignKey: "id" });

    const getData = await transactionModel.findOne({
      where: { invoice_no: invoice_no },
      include: [
        {
          model: categoryModel,
          require: true
        }
      ]
    });

    if (getData.status === "pending") {
      if (getData.category.parent_category === "ppob") {
        const updateStatus = await transactionModel.update(
          {
            status: status
          },
          {
            where: { invoice_no: invoice_no }
          }
        );
        if (updateStatus) {
          if (status === "success") {
            res.json({
              status: "success",
              response: {
                message: "Transaction successful",
                getData
              }
            });
          } else {
            const userBalance = await userModel.findOne({
              where: { id: getData.user_id }
            });
            newBalance = userBalance.balance + getData.amount;
            const refundBalance = await userModel.update(
              {
                balance: newBalance
              },
              {
                where: { id: getData.user_id }
              }
            );
            if (refundBalance) {
              res.json({
                status: "success",
                response: {
                  message: "Transaction failed",
                  getData
                }
              });
            }
          }
        }
      } else {
        res.json({
          status: "error",
          response: "Cant update status"
        });
      }
    } else {
      res.json({
        status: "error",
        response: "Cant update status"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.getHistoryById = async (req, res) => {
  try {
    const id = req.params.transaction_id;
    transactionModel.belongsTo(categoryModel, { foreignKey: "category_id" });
    categoryModel.hasMany(transactionModel, { foreignKey: "id" });

    const dataHistory = await transactionModel.findAll({
      where: { id },
      include: [
        {
          model: categoryModel,
          require: true
        }
      ]
    });
    return res.json({
      status: "success",
      response: dataHistory
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};
