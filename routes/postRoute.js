const express=require('express');
const router=express.Router();
const Post=require('../models/Post')
const {check,validationResult, body}=require('express-validator')
const authentication=require('../middleware/authentication')
const upload=require('../middleware/upload');
const User = require('../models/User');
const { json } = require('express');
//for inserting the blog
router.post('/blog/insert'
,[
    check('title',"Blog must have title").not().isEmpty(),
    check('description',"Blog must some short of description").not().isEmpty()
]
,
upload.single('image')
,
authentication.verifyUser,
function(req,res){
// const errors=validationResult(req)
if(req.file==undefined){
    return res.status(400).json({message:"invalid image Type!!"})
}

if(errors.isEmpty()){
   
    const title=req.body.title
    const description=req.body.description
    const userID=req.user._id
    const category=req.body.category
    const image=req.file.filename
    const data=new Post({
        title:title,
        description:description,
        userID:userID,
        image:image,
        category:category
    })
    
    data.save()
    .then(function(data){
        res.status(200).json({data,success:true})
    })
    .catch(function(e){
        res.status(400).json({message:e,success:false})
    })

}   
else{
    res.status(400).json(errors.array())
}
})

//android insert for blog
router.post('/android/blogs/insert',authentication.verifyUser,function(req,res){
console.log(req.body)
const title=req.body.title
const description=req.body.description
const userID=req.user._id
const category=req.body.category
const data=new Post({
    title:title,
    description:description,
    userID:userID,
    category:category
})

data.save()
.then(function(data){
    res.status(200).json({data,success:true,message:"added succefully"})
})
.catch(function(e){
    res.status(400).json({message:e,success:false})
})
})
//insert image
router.post('/blog/:id/image', upload.single('image'),authentication.verifyUser,function(req,res){
    const id=req.params.id;
    if(req.file==undefined)
    {            
        return res.status(400).json({message:"invalid image Type!!"})     
    }
    const image=req.file.filename
    Post.updateOne({_id:id},{image:image})
    .then(function(data){
        res.status(202).json({message:"Updated profile successfully",data,success:true})
    })
    .catch(function(e){
        res.status(500).json({message:e,success:false})
    })
})


//updated post
router.put('/post/update/:id',authentication.verifyUser,function(req,res){
    const id=req.params.id;
    const title=req.body.title
    const description=req.body.description
    const postedBY=req.body.userID
    const category=req.body.category
if(req.user._id==postedBY){
    Post.updateOne({_id:id},{title:title,description:description,category:category})
    .then(function(result){
        res.status(203).json({message:"Updated sucessfully !!"})
    })
    .catch(function(e){
        res.status(404).json({message:e})
    })
}
 else{
     res.status(405).json({message:"your are not allowed to update"})
 }   
})
//get all the posted blog
router.get('/post/all',
authentication.verifyUser,
function(req,res){
    Post.find().populate('userID').select("-password").sort('-createdAT')
    .then(function(data){
        
        res.status(200).json({data,success:true})
    })
    .catch(function(e){
        res.status(400).json({message:e,success:false})
    })
})
// delete routes for deletin post
router.delete('/post/delete/:id/:userID',authentication.verifyUser,
function(req,res){
    const id=req.params.id
    const userID=req.params.userID
    if(req.user._id==userID){
        Post.deleteOne({_id:id})
        .then(function(result){
            res.status(201).json({message:"Deleted Successfully !!"})
        })
        .catch(function(e){
            res.status(500).json({message:e})
        })
    }
    else{
        res.status(405).json({message:"not allowed to delete the blog"})
    }
   
})
// get single post
router.get('/blog/single/:id',authentication.verifyUser,function(req,res){
    const id=req.params.id;
    Post.findOne({_id:id}).populate('userID')

    .then((data)=>{
        
        res.status(200).json({data,success:true})
    })
    .catch((e)=>{
        res.status(400).json({e,success:false})
    })
})
router.get('/blogs/single/:id',authentication.verifyUser,function(req,res){
    const id=req.params.id;
    Post.findOne({_id:id})
    .then((data)=>{
        
        res.status(200).json({data,success:true})
    })
    .catch((e)=>{
        res.status(400).json({e,success:false})
    })
})

router.get('/showmypost',authentication.verifyUser,function(req,res){
const userID=
    req.user._id
Post.find({userID:userID}).sort('-createdAT')
.then((data)=>{
    res.status(200).json({data:data,success:true})
    console.log(data)
})
.catch((err)=>{
    res.status(400).json({success:false})
})
})
// router.put('/like',authentication.verifyUser,(req,res)=>{
//     console.log(req.body.postID)
//     Post.updateOne({_id:req.body.postID},{
//         $push:{likes:{LikedBy:req.user._id}}
//     }).then().catch()
// })
// router.put('/unlike',authentication.verifyUser,(req,res)=>{
//     Post.findByIdAndUpdate(req.body.postID,{
//         $pull:{likes:req.user._id}
//     },
//     {
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             res.status(403).json({error:err})
//         }
//         else{
//             res.status(203).json({message:result})
//         }
//     })
// })

router.get('/search/:query',function(req,res){
   
    let searchpattern=new RegExp("^"+req.params.query)
    Post.find({title:{$regex:searchpattern}})
    .then(blog=>{
        res.status(200).json({blog})
    })
    .catch(err=>{
        res.status(400).json({message:"not found details"})
    })
})
module.exports=router