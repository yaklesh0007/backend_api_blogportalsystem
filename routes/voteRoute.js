const express=require('express');
const router=express.Router();
const Vote=require('../models/Vote')
const {check,validationResult}=require('express-validator')

module.exports=router