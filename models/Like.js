const mongoose=require('mongoose');
const Like=mongoose.model('Like',{
    LikeBy:{
        type:String,
        required:true
    },
    PosId:{
            type:String,
            required:true
    }
})
module.exports=Like