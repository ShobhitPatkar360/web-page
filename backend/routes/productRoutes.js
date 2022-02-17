// In this module we create the endpoint for routing the product details
const express=require("express");
const router=express.Router();
const {getAllProducts,updateProduct, createProduct, deleteProduct,getProductDetails}=require("./../controller/productController");

// routing for creating new product via post requset
router.route("/products/new").post(createProduct);

// routing for display product (if get) + updata product (if put)
router.route("/products").get(getAllProducts).put(updateProduct).delete(deleteProduct);

// roting for geting details of perticular product
router.route("/getProductDetails").get(getProductDetails);


// exporting all the routes to server.js
module.exports=router
