const express=require('express');
const router=express.Router();
const issueController=require('../controllers/issueController');

router.get('/create',issueController.renderIssuePage);

router.post('/create-issue',issueController.createIssue);

router.post('/updateStatus/:issueId',issueController.updateStatus);


module.exports=router;