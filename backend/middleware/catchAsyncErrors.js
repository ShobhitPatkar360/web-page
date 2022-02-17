
// we are creating a function, if a code in enclosed in this function then assume that conde in inserted in try block
// If error occourd then we don't need to write the catch block to continue to flow of execution of program
module.exports=theFunc=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);// This catch block will manage to continue the flow of program
}