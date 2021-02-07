const express=require('express');
const router=express.Router();
const Category=require('../models/Category')
const {check,validationResult}=require('express-validator')
const authentication=require('../middleware/authentication')
router.post('/category/insert',[
    check('categoryType',"Categotype name is required").not().isEmpty()
],authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    const errors=validationResult(req)
    if(errors.isEmpty){
        const categoryType=req.body.categoryType
        const data=new Category({
            categoryType:categoryType
        })
        data.save()
        .then(function(result){
            res.status(201).json({message:result})
        })
        .catch(function(e){
            res.status(500).json({errormessage:e})
        })
    }
    else{
        res.status(400).json({message:errors})
    }
})

router.put('category/update',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    const categoryType=req.body.categoryType
    const id=req.body.id;
    Category.updateOne({_id:id},{categoryType:categoryType})
    .then(function(result){
        res.status(200).json({message:"Updated succefully!!"})
    })
    .catch(function(err){
        res.status(403).json({message:err})
    })
})
router.delete('/category/delete/:id',authentication.verifyUser,authentication.verifyAdmin,function(req,res){
    const id=req.params.id
    Category.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({message:"Updated succefully!!"})
    })
    .catch(function(err){
        res.status(403).json({message:err})
    })
})
router.get('/category/show',authentication.verifyUser,function(req,res){
    Category.find()
    .then(function(categorydata){
        res.status(200).json({message:categorydata})
    })
    .catch(function(e){
        res.status(400).json({message:e})
    })
})

module.exports=router