const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const connection = require("./Config/db")
const userRourtes = require("./Routes/user.routes")
const cookieParser = require('cookie-parser')
const cors=require("cors")
const notesRouter = require("./Routes/notes.routes")

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/user",userRourtes)
app.use("/notesRoutes",notesRouter)
app.use(cors({
    origin: "http://localhost:5172",
    Credential:true
}))

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
