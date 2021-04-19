const mongoose=require('mongoose');
const Feedback=mongoose.model('Feedback',{
    title:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    },
    description:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        default:false
    },
    createdAT:{
        type:Date,
        default:Date.now
    },
    updateAT: {
         type: Date, 
         default: Date.now }
})
module.exports=Feedback