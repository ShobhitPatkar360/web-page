const app=require("./app");
const dotenv=require("dotenv")

// setting the config file for the developmnet
dotenv.config({path:"./backend/config/dev.env"});

// for connecting mongodb database
const connectDatabase=require("./database/database");
connectDatabase();


const port=process.env.PORT;

app.listen(port,()=> {
    console.log(`running in port number ${port}`);
})