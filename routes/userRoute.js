const express=require('express');
const router=express.Router();
const User=require('../models/User')
router.post('/user/insert',function(req,res){
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const phone=req.body.phone;
    const image=req.body.image;
    const data=new User({
        username:username,
        email:email,
        password:password,
        phone:phone,
        image:image
    })
    data.save();
    res.send("inserted!!!")
})
router.get('/user/fetch',function(req,res){
    User.find().then(function(userdata){
        res.send(userdata)
    })
})
module.exports=router