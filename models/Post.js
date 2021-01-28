const mongoose=require('mongoose');
const Post=mongoose.model('Post',{
title:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
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
}

},{ timestamps: true })

module.exports=Post