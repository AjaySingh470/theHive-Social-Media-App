const sucess = (statusCode,message)=>{
    return {
        status : "ok",
        statusCode : statusCode,
        message
    }
}
const error = (statusCode,message)=>{
    return{
        status : "error",
        statusCode,
        message
    }
}
module.exports = {
    sucess,
    error
}