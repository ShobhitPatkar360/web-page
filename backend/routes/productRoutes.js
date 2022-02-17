const express=require("express");
const router=express.Router();
const {getAllProducts,getTesting, createProduct}=require("./../controller/productController");



// router.route("/products").get(getAllProducts);

// router.route("/testing").get(getTesting);

router.route("/new").post(createProduct);

module.exports=router
