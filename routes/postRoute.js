const express=require('express');
const router=express.Router();
const Post=require('../models/Post')
const {check,validationResult}=require('express-validator')


module.exports=router