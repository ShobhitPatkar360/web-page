/* In this module we create the endpoint for routing the product details */

// requiring isAuthenticatedUser to authenticate using cookie from request cookie
const {isAuthenticatedUser} = require("../middleware/auth");

// requiring the express for routing purpose
const express=require("express");
const router=express.Router();

// requiring the functions from controller to fulfill the request
const {getAllProducts,updateProduct, createProduct, deleteProduct,getProductDetails}=require("./../controller/productController");

// routing for creating new product via post requset
router.route("/products/new").post(createProduct);

// routing for display product (if get) + updata product (if put) + delete product (if delete)
router.route("/Products").get(isAuthenticatedUser,getAllProducts).put(updateProduct).delete(deleteProduct);

// roting for geting details of perticular product
router.route("/getProductDetails").get(getProductDetails);


// exporting all the routes to server.js
module.exports=router
