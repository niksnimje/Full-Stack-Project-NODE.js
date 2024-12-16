const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const connection = require("./Config/db")
const userRourtes = require("./Routes/user.routes")
// const cookieParser = require('cookie-parser')
const notesRouter = require("./Routes/notes.routes")
const cookieParser = require("cookie-parser")



const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/user",userRourtes)
app.use("/notes",notesRouter)

app.get("/",(req,res)=>{
    res.send("Hellow")
})

app.listen(process.env.PORT || 3000 ,async()=>{
    try {
        await connection
        console.log("server is running")
        
    } catch (error) {
        console.log(error)
    }
})