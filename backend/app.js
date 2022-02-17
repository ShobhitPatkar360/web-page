const express=require("express");
const app=express();

// body should be difined
app.use(express.json());

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

app.use("/api",products);


module.exports=app;