const express=require('express');
const router=express.Router();
const Like=require('../models/Like')
const authentication=require('../middleware/authentication')
router.get('/like/:postID',authentication.verifyUser,
function(req,res){
    const LikeBy=req.user._id;
    const PostId=req.params.postID;

    // const data=new Like({LikeBy:LikeBy,PostId:PostId})
    // data.save()
    //  .then(function(succ){
    //      res.status(200).json({success:true,succ,message:"thankyou for liking the post"})
    //  })
    //  .catch(function(e){
    //      res.status(400).json({success:false,e})
    //      console.log(e)
    //  })
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

router.get('/like/history/:postID',authentication.verifyUser,function(req,res,){
    const postId=req.params.postId;
    Like.find({PostId:postId})
    .then(function(data){
        res.status(200).json({success:true,data})
    })
    .catch(function(err){
        res.status(400).json({success:false,message:"cannot found data of that post"})
    })
})



module.exports=router