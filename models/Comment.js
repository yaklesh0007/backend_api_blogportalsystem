const mongoose=require('mongoose');
const Comment=mongoose.model('Comment',{
commentBody:{
    type:String,
    required:true
},
userID:{
    type:String,
    required:true
},
postID:{
    type:String,
    required:true
}
},{timestamps:true})

module.exports=Comment