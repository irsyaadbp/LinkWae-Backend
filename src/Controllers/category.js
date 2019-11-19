"use-strict";

const { categoryModel } = require("../Models/category");

exports.getCategory = async (req, res)=>{
  try{
  	const dataCategory = await categoryModel.findAll();
  	res.json({
      status: "success",
      response: dataCategory
  	});
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.getCategoryId = async (req, res)=>{
	try{
		let id = req.params.id

		const dataCategoryId = await categoryModel.findOne({ 
			where : { id : id}
		});
		res.json({
      status: "success",
      response: dataCategoryId
		});
	} catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.postCategory = async (req, res) => {
  console.log(req.body)
  try {
    await categoryModel.create({
      name :req.body.name,
      address :req.body.address,
      detail :req.body.detail,
      longitude :req.body.longitude,
      latitude :req.body.latitude,
      parent_category: req.body.parent_category,
    }).then(response =>{
      categoryModel.findOne({
        where: {
          name : response.name
        }
      }).then(result =>{
         res.json({
          status: "success",
          response: result
          });
      })
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let id = req.params.id

    await categoryModel.findOne({
      where : { id : id }
    })
    .then(response => {
      response.update(req.body)
      .then(result => {
        res.json({
          status: "success",
          response: result
        });
      })
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let id = req.params.id

    await categoryModel.destroy({
      where : { id : id }
    })
    .then(response => {
      res.json({
        status: "success",
        response: {
          id: id,
          message :'Delete category success!'
        }
      });
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};