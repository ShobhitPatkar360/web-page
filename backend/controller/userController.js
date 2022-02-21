/* here function is definef for routing purpose */

// For requireing the error handler class to handle error
const ErrorHandler=require("./../util/errorHandler");
const catchAsyncErrors=require("./../middleware/catchAsyncErrors");

// requiring the database
const Users=require("./../modules/userModule");

// requiring the function for token creation
const sendToken = require("../util/jwttoken");

// Registering a new user
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    // selecting the fields from req.body
    const {name,email,password}=req.body;
    console.log("Showing the request",req.body);

    // crating a new user and storing the response (from database) in  user
    const user=await Users.create({
        name,
        email,
        password,
        avatar:{
            publicId:"this is pic id",
            url:"profile pic url"

        }
    });

    // const token=user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     token
    // })

    //Crating and sending token using function
    sendToken(user,201,res);
})

// Signin by user (login request)
exports.login=catchAsyncErrors(async(req,res,next)=>{

    // selecting the fields from req.body
    const {email,password}=req.body;

    if(!email||!password) {// Detecting null entry of email or password
        return next(new ErrorHandler("please enter email and password",400));
    }
    // Finding the user and storing response (form database) in user
    const user=await Users.findOne({email}).select("password");
    if(!user) {
        return next(new ErrorHandler("invalid email or passowrd",401));
    }

    // compare accesses the password fild(selection is false), decode and compare it
    const isPasswordCorrect=await user.comparePassword(password);

    if(!isPasswordCorrect) {
        return next(new ErrorHandler("Invalid email or password",401));
    }
    // generating token but not using it is also in sendToken()
    const token=user.getJWTToken();

    //Crating and sending token using function
    sendToken(user,201,res);
})
