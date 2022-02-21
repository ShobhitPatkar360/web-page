/* Here Schema is made and stored in "userSchema"*/


// mongoose is used to connect to database and validate the data before saving to database
const mongoose=require("mongoose");

// requiring the validator that works with mongoose to ensure correct email id
const validator=require("validator");

//requiring the bcript to encript the password before saving
const bcrypt=require("bcrypt");

//requiring the jsonwebtoken to generate the token in function definition (this function is special)
const jwt=require("jsonwebtoken");

// userSchema represents the whole schema of database
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],// this validator ensures this field should not be empty
        minlength:[4,"name should have atleast four characters"], //validator
        maxlength:[40,"name cannot exceed 40 characters"] //validator
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,// validator checks value should be unique throughout the database

        //internal conditions for emails by validator library
        validate:[validator.isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[5,"password should be greater than 8 characters"],
        select:false // this validator ensures password should not go along with response of database
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
        default:"user"// if no data is given then by default it gets values as "user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

// Crating a pre function to hash the password, it is generally a middleware to encript the password which is called befor saving the datails to database
userSchema.pre("save",async function(next){
if(!this.isModified("password")) {
    next();
}
    this.password=await bcrypt.hash(this.password,10);//10 is round salt for hashing
})

// Crating a function to generate a token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{//sigh() function to generate token, requires=> document id and secret key
        expiresIn:process.env.JWT_EXPIRES
    })
}

// Crating a function to compare the password
userSchema.methods.comparePassword= async function(password) {
    return await bcrypt.compare(password,this.password);
}

// exporting the schema
module.exports=mongoose.model("users",userSchema);