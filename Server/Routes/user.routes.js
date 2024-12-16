const express=require("express")
const { singup, singin } = require("../Controller/user.controller")



const   userRourtes=express.Router("")


userRourtes.post("/singup",singup)

userRourtes.post("/singin",singin)



module.exports=userRourtes