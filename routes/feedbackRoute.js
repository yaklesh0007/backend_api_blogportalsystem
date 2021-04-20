const express=require('express');
const router=express.Router();
const Feedback=require('../models/Feedback')
const authentication=require('../middleware/authentication')
router.post('/addfeedback', authentication.verifyUser,function(req,res){
    const userID=req.user._id
    const title=req.body.title
    const description=req.body.description
    
    const data=new Feedback({
        userID:userID,
        title:title,
        description:description
    })
    data.save()
    .then((data)=>{
        res.status(200).json({success:true,data,message:"Feedback Saved !!"})
    })
    .catch((e)=>{
        res.status(400).json({success:false,massage:"Cannot able to add your feedback !!",e})
    })
})
router.get('/fetchfeedback',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    Feedback.find().populate('userID').select('-password').sort('-createdAT')
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})
// router.get('/fetchfeedback/unapproved',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
//     Feedback.find({approved:false}).populate('userID').select('-password').sort('-createdAT')
//     .then(function(data){
//         res.status(200).json({data,success:true})
//     })
//     .catch((err)=>{
//         res.status(400).json({success:false,err})
//     })
// })

router.get('/getapproved/feedback',function(req,res){
    Feedback.find({approved:true}).populate('userID').select("-password").sort('-createdAT')
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})

router.put('/approve/feedback/:id',function(req,res){
    Feedback.updateOne({_id:req.params.id},{approved:true})
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})
router.put('/unapprove/feedback/:id',function(req,res){
    Feedback.updateOne({_id:req.params.id},{approved:false})
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})

router.delete('/feedback/delete/:id',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    Feedback.deleteOne({_id:req.params.id})
    .then((data)=>{
        res.status(200).json({success:true,message:"deleted feedback !!",data})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})
module.exports=router