const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController');

router.get('/create',projectController.renderProjectPage);
router.post('/create-project',projectController.addProject);


router.get('/project-details/:projectId', projectController.viewProject);
router.get('/sort',projectController.sortProject);
router.post('/star/:projectId', projectController.starProject);

router.delete('/delete-project/:projectId', projectController.deleteProject);

module.exports=router;