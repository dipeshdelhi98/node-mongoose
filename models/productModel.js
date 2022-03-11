const mongoose=require('mongoose');



// Product schema:-

// ProductId:string

// Name:string

// Description:string

// TagSpecial:boolean

// Rating:number

// Tagging:[{ year:number, tagId:number }]

const productSchema=mongoose.Schema({
    productId:{
        type:"String",
        required:true,
        unique:true
    },
    name:{
        type:"String",
        required:true
    },
    description:{
        type:"String",
        required:true
    },
    tagSpecial:Boolean ,
    rating:'Number',
    tagging:[{ year:Number, tagId:Number }]
});


const productModel=mongoose.model('products',productSchema);

module.exports=productModel;