const mongoose=require('mongoose');
const Post=mongoose.model('Post',{
title:{
    type:String,
    required:true
},
image:{
    type:String
    
},
description:{
    type:String,
    required:true
},
userID:{
    type:String,
    required:true
},
categoryID:{
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

module.exports=Post