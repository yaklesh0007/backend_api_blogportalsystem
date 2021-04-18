const mongoose=require('mongoose');
const Like=mongoose.model('Like',{
    LikeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    PostId:{
            type:String,
            required:true
    }
})
module.exports=Like