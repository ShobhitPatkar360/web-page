/* here basically we are crating the token using the sendToken() and saving it to cookies of clent's browser */

// function to create and save the token
const sendToken=(user,statusCode,res)=>{
    user.token=user.getJWTToken();// generate token using user's id and secret key
    const option={
        expires:new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000), // setting the expiry of token
        httpOnly:true // dont know
    };

    // response after creating token => token stored in cookie + showing details of user
    res.status(statusCode).cookie("token",user.token,option).json({
        success:true,
        user
    })
}

// exporting whole process in form of sendToken
module.exports=sendToken;