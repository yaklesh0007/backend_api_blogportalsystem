const express=require('express');
const router=express.Router();
const Like=require('../models/Like')
const {check,validationResult}=require('express-validator')

module.exports=router