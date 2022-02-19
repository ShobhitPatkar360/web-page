const express=require("express");
const router=express.Router();
const {registerUser, login}=require("./../controller/userController");

router.route("/registerUser").post(registerUser);
router.route("/login").post(login);


module.exports=router;