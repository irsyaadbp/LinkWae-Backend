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
    const id = req.params.id;

		const dataCategoryId = await categoryModel.findOne({
			where : { id : id }
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

exports.getCategoryParent = async (req, res)=>{
	try{
    
    const parent = req.params.parent;

		const dataCategoryParent = await categoryModel.findAll({
			where : { parent_category : parent }
		});
		res.json({
      status: "success",
      response: dataCategoryParent
		});
	} catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.postCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const parent_category = req.body.parent_category;

    if(parent_category === null || parent_category === '' || parent_category === undefined){
      return res.json({
        status : 'error',
        response : 'Parent category cant be empty'
      })
    }

    if(name === null || name === '' || name === undefined){
      return res.json({
        status : 'error',
        response : 'Name category cant be empty'
      })
    }

    const checkName = await categoryModel.findOne({
      where : { name }
    })

    if(checkName){
      return res.json({
        status : "error",
        response :  'Name category is exist'
      })
    }

    await categoryModel.create({
      name :name,
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
    const id = req.params.id;
    const name = req.body.name;

    const checkParent = await categoryModel.findOne({
      where : { id : id }
    })

    if(checkParent.parent_category === 'merchants' || checkParent.parent_category === 'donation' ){
      if (name === null || name === '' || name === undefined){
          const updateCategory = await categoryModel.update({
            name : req.body.name,
            address : req.body.address,
            detail : req.body.detail,
            longitude : req.body.logitude,
            latitude : req.body.latitude
          },{
            where : { id : id }
          });
          if(updateCategory) {
            const dataUpdateCategory = await categoryModel.findOne({
              where : { id }
            })
            res.json({
              status: "success",
              response: {
                  dataUpdateCategory
              }
          });
        }   
      }else{
        const checkName = await categoryModel.findOne({
          where : { name }
        })

        if(checkName){
          if( id == checkName.id ){
              const updateCategory = await categoryModel.update({
                name : req.body.name,
                address : req.body.address,
                detail : req.body.detail,
                longitude : req.body.logitude,
                latitude : req.body.latitude
              },{
                where : { id : id }
              });
              if(updateCategory) {
                const dataUpdateCategory = await categoryModel.findOne({
                  where : { id }
                })
                res.json({
                  status: "success",
                  response: {
                      dataUpdateCategory
                  }
              });
            }
          }else{
            res.json({
              status: 'error',
              response : 'Name category is exist'
            })
          }
        }
      } 
    }else{
        res.json({
          status: "error",
          response: "This category cant be updated"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};