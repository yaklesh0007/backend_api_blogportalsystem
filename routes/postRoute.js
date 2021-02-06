const express=require('express');
const router=express.Router();
const Post=require('../models/Post')
const {check,validationResult}=require('express-validator')
const authentication=require('../middleware/authentication')


module.exports=router