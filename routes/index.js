const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{

    return res.redirect('/home');
})
router.use('/home',require('./homeRoute'));
router.use('/project',require('./projectRoute'));

module.exports=router;