export const globalErrorHandling=(error,req,res,next)=>{
    return res.status(error.cause||500).json({
        message:error.message,
        error ,
        stack:error.stack
    })
            
}