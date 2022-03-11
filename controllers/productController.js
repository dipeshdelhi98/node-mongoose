const Product=require('../models/productModel');
const mongoose=require('mongoose')

module.exports={

    create:async (req,res)=>{
        console.log('req body==>',req.body);

        const {title,description}=req.body

        try {
            const product=new Product(req.body)


            product.save().then((data)=>{
                console.log(data)
             return res.json({
                 status:"Success",
                 message:"Succesfully Created",
             
             })
            }).catch((error)=>{
                console.log(error)
                res.status(400).send({message:"Something Went Wrong"})
            });
            
        } catch (error) {
            console.log(error)
            return res.json({
                status:"Error",
                message:"Something Went Wrong",
                data:{}

            })
            
        }
    },


    findAll:async(req,res)=>{

        console.log("Inside findAll");
    
        await Product.find({}).then((data)=>{
            // console.log(data)

         return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });
        
    },


    //query to find the count of tagSpecial and maximum value of rating, which have tagSpecial true


    findByproductId:async(req,res)=>{

        console.log("req params==>",req.params)

        await Product.aggregate([
            { "$match" : {tagSpecial :true } },
        {
                $group: {
                    "_id": null,
                    count: {
                        "$sum":1
                    },
                   
                    maxRating: { $max: "$rating" }
                }
            }
        ]).then((data)=>{
            console.log(data)

         return res.json({
             status:"Success",
             message:"Data fetched Successfully",
             data:data
         })
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });


    },


    // to update tagging of given productId.


    updateByTagging:async(req,res)=>{

 
        console.log("req.body ",req.body);

        await Product.findOneAndUpdate({productId:req.body.productId},req.body ).then((data)=>{
            return res.send({message:"Successfully Updated"})

        //  return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });


    },

    //to remove tagging which is greater than the given year.

    deleteByTaggingYear:async(req,res)=>{

        console.log("req.body ",req.body);


   

      const productData=await  Product.findOne({productId:req.body.productId} )

    //   console.log(productData)


      if(productData.tagging.length==0){

        return res.send({message:"Tagging does not exist"})

      }

      if(productData.tagging[0].year>=req.body.tagging[0].year){

        await Product.updateOne({productId:req.body.productId}, {$unset: {tagging:""}});

        res.send({message:"Successfully remove tagging"})

      }else{

        res.send({message:"Everything is fine"})

      }


    },

}