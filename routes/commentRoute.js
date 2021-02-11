const express=require('express');
const router=express.Router();
const Comment=require('../models/Comment')
const {check,validationResult}=require('express-validator')
const authentication=require('../middleware/authentication')
router.post('/comment/insert',[
    check('commentBody',"Comment must not be empty").not().isEmpty(),
    check('postID',"Comment on post should not be empty").not().isEmpty()
],authentication.verifyUser,function(req,res){
    const errors=validationResult(req)
    if(errors.isEmpty()){
        const commentBody=req.body.commentBody,
        const userID=req.user._id,
        const postID=req.body.postID
        const data=new Comment({
            commentBody:commentBody,
            userID:userID,
            postID:postID
        })
        data.save()
        .then(function(result){
            res.status(200).json({message:"Commented on blog successfully!!"})
        })
        .catch(function(e){
            res.status(400).json({message:e})
        })
    }
    else{
        res.status(400).json(errors.array())
    }
})
router.get('/comment/:postID',authentication.verifyUser,function(req,res){
    const postID=req.params.postID
    Comment.find({postID:postID})
    .then(function(result){
        res.status(200).json({message:result})
    })
    .catch(function(e){
        res.status(400).json({message:e})
    })

})
router.put('/comment/update/:id',authentication.verifyUser,
authentication.verifyAdminNormalUser,
function(req,res){
    const userID=req.body.userID
    const commentBody=req.body.commentBody
    const id=req.params.id
    
    if(req.user._id==userID){
        Comment.updateOne({_id:id},{commentBody:commentBody})
        .then(function(success){
            res.status(202).json({message:success})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    }
    else{
        res.status(405).json({message:"not allowed to edit the comment!!"})
    }

})
router.delete('comment/delete:id',authentication.verifyUser,
authentication.verifyAdminNormalUser,function(req,res){
    const postedBY=req.body.userID

    if(req.user._id==postedBY){
        Comment.deleteOne({_id:req.params.id})
        .then(function(success){
            res.status(202).json({message:success})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    }
    else{
        res.status(405).json({message:"not allowed to delete"})
    }
    
})

module.exports=router