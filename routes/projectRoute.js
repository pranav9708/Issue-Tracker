const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController');

router.get('/create',projectController.renderProjectPage);
router.post('/create-project',projectController.addProject);


module.exports=router;