const Products=require("./../modules/productModule");
const express=require("express");
const app=express();


// body should be difined
// app.use(express.json());
// app.use(express.urlencoded({
//     extended:true
// }))

// Not Sure about below code
// exports.getAllProducts=async(req,res)=>{
//     console.log("from getAllProducts",req.body);
//     const product=await Products.create(req.query);

//     res.status(201).json({
//         success:true,
        
//     })
// }

exports.getTesting=(req,res)=>{
    console.log("routes are woring from testing function");
    res.status(200).json({message:"routing is successful from testing function"});

}


// Final code is following, we are woring on testing code
// exports.createProduct=async(req,res,next)=>{
//     console.log("from create products",req.body);
//     // const p=JSON.parse(req.query)
    
//     const product=await Products.create(req.query)

//     res.status(201).json({
//         success:true,
//         product
//     })
// }

exports.createProduct=async(req,res,next)=>{
    console.log("from create products",req.body);
    
    
    
    const product=await Products.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}

