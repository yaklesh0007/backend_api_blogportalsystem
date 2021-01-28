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
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    image:{
        type:String
    }

})
module.exports=User