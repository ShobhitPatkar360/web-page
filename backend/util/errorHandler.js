// inherithing the parent class (Error)
class ErrorHandler extends Error{
    constructor(message,statusCode) { //when error will occour this constructor will be called
        super(message); // used for display message
        this.statusCode=statusCode; //used for display error code (status code)
        Error.captureStackTrace(this,this.constructor); //used to detect the location of occoured error
    }
}

module.exports=ErrorHandler;