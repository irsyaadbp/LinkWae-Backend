"use-strict";

const {categories} = require("../Models/category");

exports.getCategory = async (req, res)=>{
  try{
  	const dataCategory = await categories.findAll();
  	res.json({
  		data : dataCategory
  	});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};

exports.getCategoryId = async (req, res)=>{
	try{
		let id = req.params.id

		const dataCategoryId = await categories.findOne({ 
			where : { id : id}
		});
		res.json({
			data : dataCategoryId
		});
	} catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: error
    });
  }
};

exports.postCategory = async (req, res) => {
  try {
    const dataPost = await categories.create({
    	name :req.body.name,
    }).then(response =>{
      categories.findOne({
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

exports.updateCategory = async (req, res) => {
  try {
    let id = req.params.id

    const dataUpdate = await categories.findOne({
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

exports.deleteCategory = async (req, res) => {
  try {
    let id = req.params.id

    const dataDelete = await categories.destroy({
      where : { id : id }
    })
    .then(response => {
      res.json({
        status : 200,
        id: id,
        message : 'Delete category success!'
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