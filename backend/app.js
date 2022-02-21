// basically execution starts from here (it seems)
const express=require("express");
const app=express();

// requiring the cookie-parser
const cookieparser=require("cookie-parser")
app.use(cookieparser());

//handeling ucaught exceptions
// process.on("uncaughtException",(err)=>{
//     console.log("error message=>",err.message);
//     console.log("Shutting Down the server...");
//     process.exit(1);
// })

// body should be difined
app.use(express.json());
// uncaught exception handeling testing
// console.log(shobhit)

// importing routes of Product and user
const products=require("./routes/productRoutes");
const users=require("./routes/userRoutes");

// for making query
// app.use("/",(req,res,next) => {
//     console.log("API_CALLED=>", {
//         PATH: req.path,
//         BODY: req.body,
//         QUERY:req.query
//     });
//     next();
// })


// all routing starts or used from here 
app.use("/api/product",products);
app.use("/app/user",users);

// middleware for error, ruquire once, work on all modules, always place after app.use()
const errormiddleware=require("./middleware/error");
app.use(errormiddleware);

// this app is very important variable
module.exports=app;