const express=require('express');
const router=express.Router();
const Like=require('../models/Like')
const authentication=require('../middleware/authentication')

router.get('/like/history',authentication.verifyUser,function(req,res,){
    const postId=req.body.postId;
    Like.find({PosId:postId})
    .then(function(data){
        res.status(200).json({success:true,data})
    })
    .catch(function(err){
        res.status(400).json({success:false,message:"cannot found data of that post"})
    })
})
router.delete('/like/delete/:id',authentication.verifyUser,function(req,res){
  const likeid=  Like.findById({
        _id:req.params.id
    })
    if(likeid.LikeBy==req.user._id)
    {
        Like.deleteOne({_id:req.params.id})
        .then(function(data){
            res.status(203).json({success:true})
        
        })
        .catch(function(e){
            res.status(400).json({success:false})
        })

    }

})
router.post('/like',authentication.verifyUser,function(req,res){
    const LikedBy=req.user._id;
    const PostId=req.body.postId;

   Like.findOne({LikeBy:LikedBy,PostId:PostId})
   .then(function(err){
       res.status(404).json({message:"user alredy liked the post",success:true})
   })
   
        

    const data=new Like({LikedBy:LikedBy,PostId:PostId})
    data.save()
     .then(function(succ){
         res.status(200).json({success:true,data})
     })
     .catch(function(e){
         res.status(400).json({success:true,e})
     })
})

module.exports=router