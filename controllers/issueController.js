const Issue=require('../models/Issue');
const Project=require('../models/Project');

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
        await Issue.findByIdAndUpdate(req.params.issueId,req.body);
        const issue=await Issue.findById(req.params.issueId);
        const projectId = issue.project.toString(); 
        return res.status(200).json(projectId);
    }catch(err){
        console.error("Error:", err);
        res.render('project-details');
    }
}


module.exports.addComment=async(req,res)=>{
    try{
        const IssueId=req.params.issueId;
        const issue=await Issue.findById(IssueId);
        issue.comments.push(req.body.commentText);
        await issue.save();

        const projectId=issue.project.toString();
        return res.status(200).json(projectId);

    }catch(err){
        console.error("Error:", err);
        res.render('home')
    }
}


module.exports.deleteIssue= async(req,res)=>{
    try{
        const IssueId=req.params.issueId;
        const issue=await Issue.findById(IssueId);
        const projectId=issue.project.toString();
        await Issue.findByIdAndDelete(IssueId);
        await Project.findByIdAndUpdate(projectId,{$pull:{issues:IssueId}},{new:true});
        return res.status(200).json(projectId);

    }catch(err){
        console.error("Error:", err);
        res.render('home')
    }
}


module.exports.filterIssue = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId).populate('issues');
        const { authorName, status, labels } = req.body;

        const filteredIssues = project.issues.filter(issue => {
            return (
                (!authorName || issue.author === authorName) &&
                (!status || issue.status === status) &&
                (labels.length === 0 || labels.some(label => issue.labels.includes(label)))
            );
        });

        res.json(filteredIssues);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};