const mongoose=require('mongoose');
const User=mongoose.model('User',{
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    image:{
        type:String
    }

})
module.exports=User