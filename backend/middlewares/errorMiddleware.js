//class is used instead of function because it is node.js
//error naam ki class exists in js so used class 57:20 explanation
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
export const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    //11000 code is used when duplicate email or something is given to show ye phle se exist krta hai
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err= new ErrorHandler(message, 400);
    } 
    if(err.name === "JsonWebTokenError") {
        const message = "Json Web Token is Invalid, Try Again!"
        err= new ErrorHandler(message, 400);
    }
    if(err.name === "TokenExpiredError") {
        const message = "Json Web Token is Expired, Try Again!"
        err= new ErrorHandler(message, 400);
    }
    //cast error comes when data type doenot match with input like name given in numbers instead of characters
    if(err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err= new ErrorHandler(message, 400);
    }
    const errorMessage = err.errors
    ? Object.values(err.errors)
    .map((error) => error.message)
    .join(" "): 
    err.message;
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    })
}
export default ErrorHandler;