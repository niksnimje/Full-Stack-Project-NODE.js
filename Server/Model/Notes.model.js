const mongoose=require("mongoose")

const NoteScheama=new mongoose.Schema({
    title:String,
    body:String,
    Notesimg:{
        type:String,
        default:"https://play-lh.googleusercontent.com/vSNQds6F5roxdN4-a16JnQ9dWQVSZZ8OH4-iMAcNLaFQd3ItZWU8rOPOql4Ew5Hh1esX=w600-h300-pc0xffffff-pd"
    },
    userID:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const NotesModel=mongoose.model("notes",NoteScheama)

module.exports=NotesModel
