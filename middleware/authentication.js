const jwt=require('jsonwebtoken')
const User=require('../models/User')
//check for token
module.exports.verifyUser=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, 'secretkey');
        User.findOne({_id:data.uid})
        .then(function(result){
            req.user=result
            next()
    })
    .catch(function(ex){
        res.status(403).json(ex)
    })
    }
    catch(e){
        res.status(403).json({error:e})
    }
    
}
//check for admin
module.exports.verifyAdmin=function(req,res,next){
    if(!req.user)
    {
       return res.status(403).json({message:"user not allowed!"})
    }
    else if(req.user.userType!=='admin'){
        return res.status(401).json({message:"Access denied!!"})
    }
    next()
}
//check for normal user

module.exports.verifyNormalUser=function(req,res,next){
    if(!req.user){
        return res.status(403).json({message:"User not allowed !!"})
    }
    else if(req.user.userType!=='normaluser'){
        return res.status(401).json({message:"Access denied!!"})
    }
    next()
}
//check for both
module.exports.verifyAdminNormalUser=function(req,res,next){
    if(!req.user)
    {
       return res.status(403).json({message:"user not allowed!"})
    }
    else if(req.user.userType!=='admin' || req.user.userType!=='normaluser'){
        return res.status(401).json({message:"Access denied!!"})
    }
    next()
}