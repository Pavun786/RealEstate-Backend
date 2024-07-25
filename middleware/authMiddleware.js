const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const auth = async(req,res,next)=>{

    try{
        const getToken = req.header("Auth");
        const verify = await jwt.verify(getToken,process.env.SECRET_KEY)
        next()
    }
    catch(err){
        res.send({message : err.message})
    }
}

module.exports = auth;