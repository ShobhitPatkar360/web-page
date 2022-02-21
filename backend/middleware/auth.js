/* Here basically authentication releated functions are defined */

// requiring functions for error handeling
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors=require("./catchAsyncErrors");

// requiring functions for crating and managing tokens
const jwt=require("jsonwebtoken");

// requiring the database
const Users=require("./../modules/userModule");

// creting a function for authentication using request from API containing the token from cookies
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=(req.cookies) // Cookie parser will come in picture
    console.log("token=>",token); // watching the token from console
    
    if(!token) { // No token means user had not login yet
        return next(new ErrorHandler("please login first",400));
    }

    // extracting data from token using secret key
    const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log("Decoded data=>",decodedData);
    
    // watching the decoded data from console
    req.user=await Users.findById(decodedData.id);

    // watching the response from database to console
    console.log("Response from database",req.user);

    if(!req.user) { // invalid token request from api
        return next(new ErrorHandler("Invalid user",400));
    }

    // calling the next middlewre to continue the flow of execution
    next();
})