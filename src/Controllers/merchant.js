"use-strict";

const {merchants} = require("../Models/merchant");

exports.getMerchant = async (req, res)=>{
  try{
  	const dataMerchant = await merchants.findAll();
  	res.json({
  		data : dataMerchant
  	});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};

exports.getMerchantId = async (req, res)=>{
	try{
		let id = req.params.id

		const dataMerchantId = await merchants.findOne({ 
			where : { id : id}
		});
		res.json({
			data : dataMerchantId
		});
	} catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};

exports.postMerchant = async (req, res) => {
  try {
    const dataPost = await merchants.create({
      name :req.body.name,
      address :req.body.address,
      detail :req.body.detail,
      longitude :req.body.longitude,
    	latitude :req.body.latitude,
    }).then(response =>{
      merchants.findOne({
        where: {
          name : response.name
        }
      }).then(result =>{
         res.json({
            data: result
          });
      })
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};

exports.updateMerchant = async (req, res) => {
  try {
    let id = req.params.id

    const dataUpdate = await merchants.findOne({
      where : { id : id }
    })
    .then(response => {
      response.update(req.body)
      .then(result => {
        res.json({
          data: result
        });
      })
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};

exports.deleteMerchant = async (req, res) => {
  try {
    let id = req.params.id

    const dataDelete = await merchants.destroy({
      where : { id : id }
    })
    .then(response => {
      res.json({
        status : 200,
        id: id,
        message : 'Delete merchant success!'
      });
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};