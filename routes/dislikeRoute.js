const express=require('express');
const router=express.Router();
const Dislike=require('../models/Dislike')
const {check,validationResult}=require('express-validator')

module.exports=router