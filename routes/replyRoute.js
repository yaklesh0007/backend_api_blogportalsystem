const express=require('express');
const router=express.Router();
const Reply=require('../models/Reply')
const {check,validationResult}=require('express-validator')


module.exports=router