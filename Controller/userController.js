const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Register = async(req,res)=>{

    try{
        const {userName,email,password} = req.body;

        console.log(req.body)

        const verifyUser = await User.findOne({email : email})
    
        if(verifyUser){
            res.status(403).send({message : "User already exist"})
        }else{
    
            const No_Rounds = 10;
            const salt = await bcrypt.genSalt(No_Rounds)
            const hashedPasssword = await bcrypt.hash(password,salt) 
    
            const createUser = new User({
                userName : userName,
                email :email,
                password : hashedPasssword,
            })

            await createUser.save();

            console.log("user",createUser)
    
            res.status(200).send({message : "User registered successfully"})
           
        }
    }catch(err){
        res.status(500).send({message : err.message})
    }

}

const Login = async(req,res)=>{

    console.log(req.body)

    try{
        const {email,password} = req.body;

        console.log(req.body)

        const verifyUser = await User.findOne({email : email})
    
        if(!verifyUser){
            res.status(403).send({message : "User not found"})
        }else{

            const verifyPass = await bcrypt.compare(password,verifyUser.password)

            console.log(verifyPass)

            if(!verifyPass){
                res.status(400).send({message : "UnAuthorized"})
            }else{
                 
                const token = await jwt.sign({id :verifyUser._id},process.env.SECRET_KEY)

                res.status(200).send({message : "User logined successfully",token : token,data : verifyUser})
                
            }
        }
    }catch(err){
        res.status(500).send({message : err.message})
    }

}


module.exports = {Register,Login};