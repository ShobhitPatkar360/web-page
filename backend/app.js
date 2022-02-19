const express=require("express");
const app=express();

//handeling ucaught exceptions
process.on("uncaughtException",(err)=>{
    console.log("error message=>",err.message);
    console.log("Shutting Down the server...");
    process.exit(1);
})

// body should be difined
app.use(express.json());
// uncaught exception handeling testing
// console.log(shobhit)

// importing routes
const products=require("./routes/productRoutes");

// for making query
// app.use("/",(req,res,next) => {
//     console.log("API_CALLED=>", {
//         PATH: req.path,
//         BODY: req.body,
//         QUERY:req.query
//     });
//     next();
// })


// very special function but unknown, all routing starts from here (also very dagerous functon sp experience)
app.use("/api/product",products);

// middleware for error, ruquire once, work on all modules, always place after app.use()
const errormiddleware=require("./middleware/error");
app.use(errormiddleware);

// this app is very important variable
module.exports=app;