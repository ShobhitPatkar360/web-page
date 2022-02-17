const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"please enter the product name"]
    },
    description:{
        type:String,
        required:[true,"please enter the product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter the product price"],
        maxLength:[8,"price cannot exceed"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            publicId:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter the product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter the product stock"],
        default:1,
        maxLength:[4,"stock cannot exceed"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    review:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("products",productSchema);