const express=require("express");
const app=express();

// body should be difined
app.use(express.json());

// middleware for error, ruquire once, work on all modules
const errormiddleware=require("./middleware/error");

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
app.use("/api",products);

// this app is very important variable
module.exports=app;