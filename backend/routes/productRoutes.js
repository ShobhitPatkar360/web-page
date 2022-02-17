// In this module we create the endpoint for routing the product details
const express=require("express");
const router=express.Router();
const {getAllProducts,updateProduct, createProduct, deleteProduct,getProductDetails}=require("./../controller/productController");

// router.route("/testing").get(getTesting);

// routing for creating new product via post requset
router.route("/new").post(createProduct);

// routing for display product (if get) + updata product (if put)
router.route("/products").get(getAllProducts).put(updateProduct).delete(deleteProduct);

// roting for geting details of perticular product
router.route("/getProductDetails").get(getProductDetails);

module.exports=router
