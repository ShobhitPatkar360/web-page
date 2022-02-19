const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        minlength:[4,"name should have atleast four characters"],
        maxlength:[40,"name cannot exceed 40 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,

        //internal conditions for emails by validator library
        validate:[validator.isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[5,"password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        publicId:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

// Crating a pre function to hash the password
userSchema.pre("save",async function(next){
if(!this.isModified("password")) {
    next();
}
    this.password=await bcrypt.hash(this.password,10);
})

// Crating a function to generate a token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

// Crating a function to compare the password
userSchema.methods.comparePassword= async function(password) {
    return await bcrypt.compare(password,this.password);
}


module.exports=mongoose.model("users",userSchema);