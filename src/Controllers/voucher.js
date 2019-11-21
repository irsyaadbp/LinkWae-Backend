"use-strict";

const { voucherModel } = require("../Models/voucher");

function makeVoucherCode( length ) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.getVoucherAll = async (req , res) => {
    try{
        const dataVoucherAll = await voucherModel.findAll();
        res.json({
            status: "success",
            response: dataVoucherAll
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            response: error
        });
    }
};


exports.getVoucherBy = async (req , res) => {
    try{
        const code = req.params.code;

        const dataVoucherBy = await voucherModel.findOne({
            where : { code : code }
        });
        res.json({
            status: "success",
            response: dataVoucherBy
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            response: error
        });
    }
};

exports.postVoucher = async (req, res) => {
    try{
        let date = req.body.date_expired.split(/[- :]/);
        date[1]--;

        const code = makeVoucherCode(10);
        const date_expired = new Date(...date);

        //validasi voucher_code
        const checkVoucherCode = await voucherModel.findOne({
            where: { code : code }
        });
    
        if (checkVoucherCode) {
            return this.postVoucher(req, res); 
        }

        const postVoucher = await voucherModel.create({
            code : code,
            type : req.body.type,
            amount : req.body.amount,
            date_expired : date_expired
        });
        if(postVoucher){
            const newVoucherData = await voucherModel.findOne({
                where : { code : code }
            });
            return res.json({
                status: "success",
                response: {
                    newVoucherData
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

exports.updateVoucherBy = async (req , res) => {
    try {
        const code = req.params.code;
        
        const updateVoucher = await voucherModel.update({
            date_expired : req.body.date_expired,
        },{
            where : { code : code}
        });
        if(updateVoucher){
            const dataUpdateVoucher = await voucherModel.findOne({
                where : { code }
            })
            res.json({
                status: "success",
                response: {
                    dataUpdateVoucher
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            response: error
        });
    }
}

exports.deleteVoucher = async (req, res) => {
    try {
      const code = req.params.code
  
      const deleteDataVoucher = await voucherModel.destroy({
        where : { code : code }
      })
      if(deleteDataVoucher){
        res.json({
            status: "success",
            response: {
              code: code,
              message :'Delete voucher success!'
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