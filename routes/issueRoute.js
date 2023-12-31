const express=require('express');
const router=express.Router();
const issueController=require('../controllers/issueController');

router.get('/create',issueController.renderIssuePage);

router.post('/create-issue',issueController.createIssue);

router.post('/updateStatus/:issueId',issueController.updateStatus);

router.delete('/delete-issue/:issueId',issueController.deleteIssue);

router.post('/comment/:issueId',issueController.addComment);

router.post('/filter-issue/:projectId',issueController.filterIssue);


module.exports=router;