const express=require('express');
const router=express.Router();
const Reply=require('../models/Reply')
const {check,validationResult}=require('express-validator')
const authentication=require('../middleware/authentication')

router.post('/reply/insert',[
    check('replyBody',"Reply must not be empty").not().isEmpty(),
    
],authentication.verifyUser,function(req,res){
    const errors=validationResult(req)
    if(errors.isEmpty()){
        
        const replybody=req.body.replyBody
        const commentID=req.body.commentID
        const data=new Reply({
            replybody:replybody,
            userID:req.user._id,
            commentID:commentID
        })
        data.save()
        .then(function(data){
            res.status(200).json({message:"replyed to comment successfully!!",success:true,data})
        })
        .catch(function(e){
            console.log(e)
            res.status(400).json({message:e,success:false})
        })
    }
    else{
        res.status(400).json(errors.array())
    }
})
router.post('/insert/reply',authentication.verifyUser,function(req,res){
    const replybody=req.body.replybody
        const commentID=req.body.commentID
        const data=new Reply({
            replybody:replybody,
            userID:req.user._id,
            commentID:commentID
        })
        data.save()
        .then(function(data){
            res.status(200).json({message:"replyed to comment successfully!!",success:true,data})
        })
        .catch(function(e){
            console.log(e)
            res.status(400).json({message:e,success:false})
        })

})
router.get('/reply/:commentID',authentication.verifyUser,function(req,res){
    const commentID=req.params.commentID
    
    Reply.find({commentID:commentID}).populate('userID')
    .then(function(data){
        res.status(200).json({message:"get all the reply on that comment",success:true,data})
    })
    .catch(function(e){
        res.status(400).json({message:e})
        console.log(e)
    })

})
router.put('/reply/update/:id',authentication.verifyUser,
function(req,res){
    const userID=req.body.userID
    const replybody=req.body.replybody
    const id=req.params.id
    
    if(req.user._id==userID){
        Reply.updateOne({_id:id},{replybody:replybody})
        .then(function(data){
            res.status(202).json({mesage:"updated",success:true,data})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    }
    else{
        res.status(405).json({message:"not allowed to edit the reply!!"})
    }

})
router.delete('/reply/delete/:id/:userID',authentication.verifyUser,
function(req,res){
    const replyedBY=req.params.userID

    if(req.user._id==replyedBY){
        Reply.deleteOne({_id:req.params.id})
        .then(function(data){
            res.status(202).json({message:"deleted",data,success:true})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    }
    else{
        res.status(405).json({message:"not allowed to delete"})
    }
    
})
router.get('/reply/single/:id',authentication.verifyUser,function(req,res){
    Reply.findById(req.params.id)
    .then(function(data){
        res.status(200).json({success:true,data})
    })
    .catch((err)=>{
        res.status(400).json({err,success:false})
    })
})

module.exports=router