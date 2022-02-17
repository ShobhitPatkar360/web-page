// require the self created error handler class
const ErrorHandler=require("./../util/errorHandler");

//crating a middleware that is called when an error is occoured
module.exports=(err,req,res,next)=> {
    err.statusCode=err.statusCode||500; //err ka stauts code
    err.message=err.message||"internal server error"; //err ka message

    // unknown
    err.status(err.statusCode).json({
        success:false,
        err:err.stack
    })
}