const express=require('express');
const router=express.Router();
const Post=require('../models/Post')
const {check,validationResult}=require('express-validator')
const authentication=require('../middleware/authentication')
const upload=require('../middleware/upload')
router.post('/blog/insert'
// ,[
//     check('title',"Blog must have title").not().isEmpty(),
//     check('description',"Blog must some short of description").not().isEmpty(),
//     check('userID',"user id is required").not().isEmpty(),
//     check('categoryID',"It must be one of the Category").not().isEmpty()
// ]
,authentication.verifyUser,upload.single('image'),function(req,res){
const errors=validationResult(req)
if(req.file==undefined){
    return res.status(400).json({message:"invalid image Type!!"})
}
// if(errors.isEmpty()){
    
    const title=req.body.title
    const description=req.body.description
    
    const userID=req.user._id
    const categoryID=req.body.categoryID
    
    const data=new Post({
        title:title,
        description:description,
        image:req.file.path,
        userID:userID,
        categoryID:categoryID
    })
    data.save()
    .then(function(result){
        res.status(200).json({message:"Blog Added successfully!!"})
    })
    .catch(function(e){
        res.status(400).json({message:e})
    })

    // }
// else{
//     res.status(400).json(errors.array())
// }
})
router.put('/post/update/:id',authentication.verifyUser,authentication.verifyNormalUser,function(req,res){
    const id=req.params.id;
    const title=req.body.title
    const description=req.body.description
    const postedBY=req.body.userID
    const image=req.body.image
if(req.user._id==postedBY){
    Post.updateOne({_id:id},{title:title,description:description,image:image})
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
router.get('/post/all',authentication.verifyUser,authentication.verifyAdminNormalUser,
function(req,res){
    Post.find()
    .then(function(postData){
        res.status(200).json({message:postData})
    })
    .catch(function(e){
        res.status(400).json({message:e})
    })
})
router.delete('/post/delete/:id',authentication.verifyUser,
function(req,res){
    const id=req.params.id
    const userID=req.body.userID
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
router.put('/like',authentication.verifyUser,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postID,{
        $push:{likes:req.user._id}
    },
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(403).json({error:err})
        }
        else{
            res.status(203).json({message:result})
        }
    })
})
router.put('/unlike',authentication.verifyUser,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postID,{
        $pull:{likes:req.user._id}
    },
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(403).json({error:err})
        }
        else{
            res.status(203).json({message:result})
        }
    })
})
module.exports=router