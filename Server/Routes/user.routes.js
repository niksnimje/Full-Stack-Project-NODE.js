const express=require("express")
const { singup } = require("../controller/user.controller")

const   userRourtes=express.Router("")


userRourtes.post("/singup",singup)



module.exports=userRourtes