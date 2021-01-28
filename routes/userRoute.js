const express=require('express');
const router=express.Router();
const User=require('../models/User')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs');
router.post('/user/insert',[
    check('email',"Email is required!").not().isEmpty(),
    check('email',"It is not valid email").isEmail(),
    check('username',"Firstname shouldnot be empty").not().isEmpty(),
    check('password',"password should not be empty!!!").not().isEmpty(),
    check('phone',"Phone should not be empty !!").not().isEmpty()
],function(req,res){
    
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const phone=req.body.phone;
        const image=req.body.image;
        
        bcryptjs.hash(password,10,function(err,hash){
            const data=new User({
                username:username,
                phone:phone,
                email:email,
                password:hash,
                image:image
            })
            data.save();
            res.send("inserted!!!")
        })
      
        
    }
    else{
        res.send(errors.array())
    }
   
})
router.get('/user/fetch',function(req,res){
    User.find().then(function(userdata){
        res.send(userdata)
    })
})
router.get('/user/login',function(req,res){
    
})
module.exports=router