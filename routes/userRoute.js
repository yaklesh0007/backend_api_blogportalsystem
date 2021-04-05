const express=require('express');
const router=express.Router();
const User=require('../models/User')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken')
const authentication=require('../middleware/authentication')
const upload=require('../middleware/upload')
const fs = require('fs')

router.post('/user/insert',[
    check('email',"Email is required!").not().isEmpty(),
    check('email',"It is not valid email").isEmail(),
    check('username',"Firstname shouldnot be empty").not().isEmpty(),
    check('password',"password should not be empty!!!").not().isEmpty(),
    check('phone',"Phone should not be empty !!").not().isEmpty(),
    check('userType',"user must be one of the Usertype").not().isEmpty()
],function(req,res){
    
    const errors=validationResult(req);
    const user = User.findOne({email : req.body.email});
    if(user != null) {
        return res.status(422).json({
            success: false,
            errors: [
                {
                    message : 'Email already exists',
                    // param : 'email',
                    // value : req.body.email,
                    // location : 'body'
                }
            ]
            // message:"email alredy exit !!!"
        })
    }
    if(errors.isEmpty()){
        
        const email=req.body.email;
        // User.findOne({email:email})
        // .then(function(emailerr){
        //   res.status(400).json({message:"email already exit  !!" ,success:false})
        // })
       
        const username=req.body.username;
        const password=req.body.password;
        const phone=req.body.phone;
        // const image=req.file.filename;
        const gender=req.body.gender;
        const userType=req.body.userType;
        bcryptjs.hash(password,10,function(err,hash){
            const data=new User({
                username:username,
                phone:phone,
                email:email,
                password:hash,
                // image:image,
                gender:gender,
                userType:userType
            })
            data.save()
            .then(function(result){
                res.status(201).json({success:true,data})

            })
            .catch(function(e){
                res.status(500).json({message:e,success:false})
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

router.get("/images/user/:id", async function(req, res) {
    const user = await User.findById(req.params.id)
    const filePath = process.cwd() + '/' + user.image;
    if(fs.existsSync(filePath)) {
        return res.sendFile(filePath)
    }
    res.status(404).json({message : "File not found"})
})

router.get('/user/profile',authentication.verifyUser,function(req,res){
    User.findOne({_id:req.user._id})
    .select("-password")
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch(function(e){
        res.status(400).json({message:"user detail is not found",success:false})
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
           res.status(200).json({success:true,token:token,userType:userData.userType,message:"login Successful"})
        })
    })
    .catch(function(err){
        res.status(403).json({message:err})
    })
})
router.put('/user/update',authentication.verifyUser,upload.single('image'),function(req,res){
    if(req.file==undefined){
        return res.status(400).json({message:"invalid image Type!!"})
    }
        const id=req.user._id
        const username=req.body.username;
        // const email=req.body.email;
        const phone=req.body.phone;
        const image=req.file.filename
        const gender=req.body.gender;
        User.updateOne({_id:id},{username:username,
            // email:email,
            phone:phone,gender:gender,image:image})
        .then(function(data){
            res.status(200).json({message:"Updated succefully!!",success:true,data})
        })
        .catch(function(err){
            res.status(403).json({message:err,success:false})
        })

})
router.delete('user/delete/:id',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    const id=req.params.id
    User.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({message:"Deleted Successfully!!"})
    })
    .catch(function(err){
        res.status(400).json({message:err})
    })
})
router.put('/user/profile/update',authentication.verifyUser,upload.single('image'),function(req,res){
    const id=req.user._id;
    if(req.file==undefined)
    {            
        return res.status(400).json({message:"invalid image Type!!"})     
    }
    const image=req.file.filename
    User.updateOne({_id:id},{image:image})
    .then(function(data){
        res.status(202).json({message:"Updated profile successfully",data,success:true})
    })
    .catch(function(e){
        res.status(500).json({message:e,success:false})
    })
})
router.get('/user/:id',authentication.verifyUser,function(req,res){
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(data=>{
        res.status(200).json({data,success:true})
    })
    .catch(err=>{
        res.status(400).json({success:false})
    })
})


module.exports=router