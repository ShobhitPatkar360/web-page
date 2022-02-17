const mongoose=require("mongoose");

const mongodbConnection=()=>{
mongoose.connect("mongodb://localhost:27017/ecommerce",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((data)=>{
    console.log(`mongodby is connnected with server ${data.connection.host}`);

})
}

module.exports=mongodbConnection