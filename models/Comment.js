const mongoose=require('mongoose');
const Comment=mongoose.model('Comment',{
commentBody:{
    type:String,
    required:true
},
userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
postID:{
    type:String,
    required:true
},
createdAT:{
    type:Date,
    default:Date.now
},
updateAT: {
     type: Date, 
     default: Date.now }

})


module.exports=Comment