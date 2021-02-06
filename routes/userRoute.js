const express=require('express');
const router=express.Router();
const User=require('../models/User')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs');
const authentication=require('../middleware/authentication')
router.post('/user/insert',[
    check('email',"Email is required!").not().isEmpty(),
    check('email',"It is not valid email").isEmail(),
    check('username',"Firstname shouldnot be empty").not().isEmpty(),
    check('password',"password should not be empty!!!").not().isEmpty(),
    check('phone',"Phone should not be empty !!").not().isEmpty(),
    check('gender',"Gender Must be selected !!").not().isEmpty(),
    check('userType',"user must be one of the Usertype").not().isEmpty()
],function(req,res){
    
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const phone=req.body.phone;
        const image=req.body.image;
        const gender=req.body.gender;
        const userType=req.body.userType;
        bcryptjs.hash(password,10,function(err,hash){
            const data=new User({
                username:username,
                phone:phone,
                email:email,
                password:hash,
                image:image,
                gender:gender,
                userType:userType
            })
            data.save()
            .then(function(result){
                res.status(201).json({message:result})
            })
            .catch(function(e){
                res.status(500).json({errormessage:e})
            })
        })
      
    }
    else{
        res.status(400).json(errors.array())
    }
   
})
router.get('/user/fetch',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    User.find()
    .then(function(userdata){
        res.status(200).json({message:userdata})
    })
    .catch(function(e){
        res.status(400).json({message:e})
    })
})
router.post('/user/login',function(req,res){
    User.findOne({email:req.body.email})
    .then(function(userData){
        if(userData===null){
           return res.status(401).json({message:"Authentication fail"})
        }
        bcryptjs.compare(req.body.password,userData.password,function(err,cresult){
            if(cresult===false){
              return  res.status(401).json({message:" unAuthorized user"})
            }
           const token= jwt.sign({uid:userData._id},'secretkey');
           res.status(200).json({message:"login successful!!",token:token})
        })
    })
    .catch(function(err){
        res.status(403).json({message:err})
    })
})
router.put('/user/update',authentication.verifyUser,function(req,res){
        const id=req.body.id
        const username=req.body.username;
        const email=req.body.email;
        const phone=req.body.phone;
        const image=req.body.image;
        const gender=req.body.gender;
        User.updateOne({_id:id},{username:username,email:email,phone:phone,image:image,gender:gender})
        .then(function(result){
            res.status(200).json({message:"Updated succefully!!"})
        })
        .catch(function(err){
            res.status(403).json({message:err})
        })

})
router.delete('user/delete',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    const id=req.params.id
    User.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({message:"Deleted Successfully!!"})
    })
    .catch(function(err){
        res.status(400).json({message:err})
    })
})

module.exports=router