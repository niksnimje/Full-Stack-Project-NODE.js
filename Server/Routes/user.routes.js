const express=require("express")
const { singup, singin } = require("../controller/user.controller")

const   userRourtes=express.Router("")


userRourtes.post("/singup",singup)

userRourtes.post("/singin",singin)





module.exports=userRourtes