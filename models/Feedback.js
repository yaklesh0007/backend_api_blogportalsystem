const mongoose=require('mongoose');
const Feedback=mongoose.model('Feedback',{
    title:{
        type:String,
        required:true
    },
    email:{
            type:String,
            required:true
    },
    description:{
        type:String,
        required:true
    }
})
module.exports=Feedback