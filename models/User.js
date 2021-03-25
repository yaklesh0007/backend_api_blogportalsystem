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
        type:String,
        min:10,
        require:true
    },
    image:{
        type:String
        
    },
    gender:{
        type:String,
        enum:['Male','Female','Other']
        
    },
    userType:{
        type:String,
        required:true,
        enum:['normaluser','admin']
    }

})
module.exports=User