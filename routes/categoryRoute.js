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

module.exports=router