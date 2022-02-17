//require the ApiFeature class for searching
const ApiFeature=require("./../middleware/apifeature");

//require the error handler
const ErrorHandler=require("./../util/errorHandler");
const catchAsyncErrors=require("./../middleware/catchAsyncErrors");

//contain function definitions
const Products=require("./../modules/productModule");
const express=require("express");
const app=express();

// body should be difined
app.use(express.json());


// just for testing routing
exports.getTesting=(req,res)=>{
    console.log("routes are woring from testing function");
    res.status(200).json({message:"routing is successful from testing function"});
}

//creating new product
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
    console.log("Showing the body",req.body);
    const product=await Products.create(req.body) //req.body contain input from API
    // when new product is created all values are stored in product variable ( returns promise)
    res.status(201).json({
        success:true,
        product // Showing details using promise
    })
})

// Showing the list of all products all details
exports.getAllProducts=catchAsyncErrors(async(req,res,next)=>{
    // understand for searching req.body=>input, Product.fint()=> output
    const apifeature=new ApiFeature(Products.find(),req.body).search();

    // const products= await Products.find(); // if product is founded all its details will be stored in  products variable
    const products= await apifeature.query; // get the filtered data from apifeature.query 
    res.status(200).json({
        success:true,
        products // Showing details using promise
    })
})

// for updating the product
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    // checking the presence of product
    let product= await Products.findById(req.body._id);

    console.log(req.body._id)

    if(!product) { // if product not there product=> null
        return res.status(404).json({ // showing output from server in json format
            success:false,
            message:"product not found"
        })
    }

    // update => find by id + update by body
    product=await Products.findByIdAndUpdate(req.body._id,req.body, // if product is founded it will update it and all the updated details will be stored in product variable
        {   // no logics
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        res.status(200).json({
            success:true,
            product // Showing details using promise
        })
})

// function for deleting the product
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=> {
    let product=await Products.findById(req.body._id);
    
    if(!product) { // if product not there product=> null
        return res.status(404).json({
            success:false,
            message:"product not found"
        })
    }

    await product.remove(); // No need to return the deleted data
    
    res.status(200).json({
        success:true
    })
})

//function define to get the details of the product
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=> {
    const product=await Products.findById(req.body._id);

    if(!product) { // if product not there product=> null
        return res.status(404).json({
            success:false,
            message: "product not fount"
        })
    }

    res.status(200).json({
        success:true,
        product // Showing details using promise
    })
})