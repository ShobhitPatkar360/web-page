/* here routing will be done related to user details*/

// requiring the express for routing purpose
const express=require("express");
const router=express.Router();

// requiring the functions from user controller
const {registerUser, login}=require("./../controller/userController");

// for registering new user
router.route("/registerUser").post(registerUser);

// for login by the user
router.route("/login").post(login);

// exporting the routes
module.exports=router;