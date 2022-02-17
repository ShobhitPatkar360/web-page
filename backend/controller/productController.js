//contain function definitions
const Products=require("./../modules/productModule");
const express=require("express");
const app=express();
app.use(express.json());

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
    console.log("Showing the body",req.body);
    const product=await Products.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}

exports.getAllProducts=async(req,res,next)=>{
    const products= await Products.find();
    res.status(200).json({
        success:true,
        products
    })
}

// for updating the product
exports.updateProduct=async(req,res,next)=>{
    // checking the presence of product
    let product= await Products.findById(req.body._id);

    console.log(req.body._id)

    if(!product) { // if product not there product=> null
        return res.status(404).json({
            success:false,
            message:"product not found"
        })
    }

    // update => find by id + update by body
    product=await Products.findByIdAndUpdate(req.body._id,req.body,
        {   // no logics
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        res.status(200).json({
            success:true,
            product
        })
}

// function for deleting the product
exports.deleteProduct=async(req,res,next)=> {
    let product=await Products.findById(req.body._id);
    
    if(!product) {
        return res.status(404).json({
            success:false,
            message:"product not found"
        })
    }

    await product.remove();
    
    res.status(200).json({
        success:true
    })
}

//function define to get the details of the product
exports.getProductDetails=async(req,res,next)=> {
    const product=await Products.findById(req.body._id);
    console.log(`what in req.body._id ${req.body._id}`);
    console.log(`what in product ${product}`);

    if(!product) {
        return res.status(404).json({
            success:false,
            message: "product not fount"
        })
    }

    res.status(200).json({
        success:true,
        product
    })
}