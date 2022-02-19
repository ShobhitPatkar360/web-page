const ErrorHandler=require("./../util/errorHandler");
const catchAsyncErrors=require("./../middleware/catchAsyncErrors");
const Users=require("./../modules/userModule");

// Registering a new user
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log("Showing the request",req.body);
    const user=await Users.create({
        name,
        email,
        password,
        avatar:{
            publicId:"this is pic id",
            url:"profile pic url"

        }
    });

    const token=user.getJWTToken();
    res.status(201).json({
        success:true,
        token
    })
})

// Signin by user (login request)
exports.login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password) {
        return next(new ErrorHandler("please enter email and password",400));
    }

    const user=await Users.findOne({email}).select("password");
    if(!user) {
        return next(new ErrorHandler("invalid email or passowrd",401));
    }
    const isPasswordCorrect=await user.comparePassword(password);

    if(!isPasswordCorrect) {
        return next(new ErrorHandler("Invalid email or password",401));
    }
    // generating token
    const token=user.getJWTToken();

    res.status(201).json({
        success:true,
        user,
        token
    })
})
