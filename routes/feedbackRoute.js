const express=require('express');
const router=express.Router();
const Feedback=require('../models/Feedback')
const authentication=require('../middleware/authentication')
router.post('/addfeedback', function(req,res){
    const email=req.body.email
    const title=req.body.title
    const description=req.body.description
    
    const data=new Like({
        email:email,
        title:title,
        description:description
    })
    data.save()
    .then((save)=>{
        res.status(200).json({success:true,data,message:"Feedback Saved !!"})
    })
    .catch((e)=>{
        res.status(400).json({success:false,massage:"Cannot able to add your feedback !!",e})
    })
})
router.get('/fetchfeedback',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    Feedback.find()
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})
router.delete('/feedback/delete/:id',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    Feedback.deleteOne({_id:req.params.id})
    .then((del)=>{
        res.status(200).json({success:true,message:"deleted feedback !!"})
    })
    .catch((err)=>{
        res.status(400).json({success:false,err})
    })
})
module.exports=router