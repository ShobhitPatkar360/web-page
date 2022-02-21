/* Here basically we made the function to connect with mongo database and exported it */

// mongoose is used to connect to database and validate the data before saving to database
const mongoose=require("mongoose");

//  createing Function to connect with database
const mongodbConnection=()=>{
mongoose.connect("mongodb://localhost:27017/ecommerce",{ // where to connect the mongodb
    // No Logic    
    useNewUrlParser:true,
    useUnifiedTopology:true // These functions are not there when we connects with atlas
}).then((data)=>{ // handeling promise without asnyc await because mongoose.connect() returns a promise
    console.log(`mongodby is connnected with server ${data.connection.host}`);

})
}

// exporting connection function of database tp server.js
module.exports=mongodbConnection