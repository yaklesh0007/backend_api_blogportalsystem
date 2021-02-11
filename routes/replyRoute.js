const express=require('express');
const router=express.Router();
const Reply=require('../models/Reply')
const {check,validationResult}=require('express-validator')
const authentication=require('../middleware/authentication')

router.post('/reply/insert',[
    check('replybody',"Reply must not be empty").not().isEmpty(),
    check('commentID',"CommentID is required for reply to comment").not().isEmpty()
],authentication.verifyUser,function(req,res){
    const errors=validationResult(req)
    if(errors.isEmpty()){
        const replybody=req.body.replybody,
        const userID=req.user._id,
        const commentID=req.body.commentID
        const data=new Reply({
            replybody:replybody,
            userID:userID,
            commentID:commentID
        })
        data.save()
        .then(function(result){
            res.status(200).json({message:"replyed to comment successfully!!"})
        })
        .catch(function(e){
            res.status(400).json({message:e})
        })
    }
    else{
        res.status(400).json(errors.array())
    }
})
router.get('/reply/:commentID',authentication.verifyUser,function(req,res){
    const commentID=req.params.commentID
    Reply.find({commentID:commentID})
    .then(function(result){
        res.status(200).json({message:result})
    })
    .catch(function(e){
        res.status(400).json({message:e})
    })

})
router.put('/reply/update/:id',authentication.verifyUser,
function(req,res){
    const userID=req.body.userID
    const replybody=req.body.replybody
    const id=req.params.id
    
    if(req.user._id==userID){
        Reply.updateOne({_id:id},{replybody:replybody})
        .then(function(success){
            res.status(202).json({message:success})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    }
    else{
        res.status(405).json({message:"not allowed to edit the reply!!"})
    }

})
router.delete('/reply/delete/:id',authentication.verifyUser,
function(req,res){
    const replyedBY=req.body.userID

    if(req.user._id==replyedBY){
        Reply.deleteOne({_id:req.params.id})
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