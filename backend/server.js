const app=require("./app");
const dotenv=require("dotenv")

// setting the config file for the developmnet, this code position is so important that this code is used in many modules
dotenv.config({path:"./backend/config/dev.env"});

// for connecting mongodb database
const connectDatabase=require("./database/database");
connectDatabase();

// using the constant
const port=process.env.PORT;


// it is very important fuction seems like infinite loop
app.listen(port,()=> {
    console.log(`running in port number ${port}`);
})