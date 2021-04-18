const express=require('express');
const router=express.Router();
const Like=require('../models/Like')
const authentication=require('../middleware/authentication')
router.get('/likes/onpost/:postID',authentication.verifyUser,function(req,res,){
    const postId=req.params.postId;
    Like.find({PostId:postId}).populate('LikeBy').select("-password")
    .then(function(data){
        
        res.status(200).json({success:true,data:data})
    })
    .catch(function(err){
        res.status(400).json({success:false,message:"cannot found data of that post"})
    })
})
router.get('/like/:postID',authentication.verifyUser,
function(req,res){
    const LikeBy=req.user._id;
    const PostId=req.params.postID;

    Like.findOne({
        $and: [{
        'PostId': PostId
    }, {
        'LikeBy': LikeBy
    }]})
    .then(function(data){
        if(data == null){
            const data=new Like({LikeBy:LikeBy,PostId:PostId})
        data.save()
            .then(function(result){
                    res.status(200).json({success:true, message: "liked"})
            })
            .catch(function(err){
                res.status(500).json({success:false, message: err})
            })
        }else{
            Like.deleteOne({LikeBy:LikeBy,PostId:PostId})
            .then(function(result){
                res.status(200).json({success:true, message: "Unliked"})
            })
            .catch(function(err){
                res.status(500).json({success:false, message: err})
            });
        }
    })
    .catch(function(err){
        res.status(500).json({success:false, message: err})
    })


})





module.exports=router