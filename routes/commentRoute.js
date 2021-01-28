const express=require('express');
const router=express.Router();
const Comment=require('../models/Comment')
const {check,validationResult}=require('express-validator')


module.exports=router