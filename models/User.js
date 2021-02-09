const mongoose=require('mongoose');
const User=mongoose.model('User',{
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        min:6,
        max:15,
        require:true
    },
    phone:{
        type:Number,
        min:10,
       
        require:true
    },
    image:{
        type:String,
        default:"noimg.jpeg"
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    userType:{
        type:String,
        enum:['admin','normaluser'],
        required:true
    }

})
module.exports=User