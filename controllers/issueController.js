const Issue=require('../models/Issue');


module.exports.renderIssuePage=(req,res)=>{
    const projectId = req.query.projectId;
    return res.render('issue',{projectId:projectId,error:false});
}

module.exports.createIssue=async (req,res)=>{
    try{
        await Issue.create(req.body);
        return res.redirect('/home');
    }catch(err){
        console.error("Error:", err);
        res.render('Issue',{error:err.message});
    }
}

module.exports.updateStatus=async(req,res)=>{
    try{
        await Issue.findById(req.params.issueId,req.body);
    }catch(err){
        console.error("Error:", err);
        res.render('project-details');
    }
}