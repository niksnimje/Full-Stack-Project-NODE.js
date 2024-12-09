const UserModel = require("../Model/User.model")

const bcrypt=require("bcrypt")

const singup= async(req,res)=>{

    const {name,email,password}=req.body

    if(req.body.role){
        return res.status(400).send({message:"User Is Not Send Role "})
    }
    if(!name || !email || !password){
        return res.status(400).send({message:"Please Fill All Fields"})   
    }

    try {
        
        const isUserExist=await UserModel.findOne({email})
        if(isUserExist)
        {
            return res.status(200).send({message:"Okay User Hai "})
        }

        bcrypt.compare(password, 5, async(err, hash)=> {
            
            if(err)
            {
                return res.status(400).send({message:"Error in Hash Password"})
            }

            await UserModel.create({name,email,password:hash})
            res.status(201).send({message:"User Create Successfully"})

        });


    } catch (error) {
        res.send(error)
        console.log(error)
    }



}

module.exports={singup}