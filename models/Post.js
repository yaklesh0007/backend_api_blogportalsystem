const mongoose=require('mongoose');
// const {ObjectId}=mongoose.model.type
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
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    
},
category:{
    type:String,
    
    enum:['Social','IT','Personal development','Science and technology','Astrology','Political']
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