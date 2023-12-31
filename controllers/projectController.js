const Project=require('../models/Project');
const Issue=require('../models/Issue');

module.exports.renderProjectPage=(req,res)=>{
    return res.render('project',{error:false});
}

module.exports.addProject=async (req,res)=>{
    try{
        await Project.create(req.body);
        return res.redirect('/home');
    }catch(error){
        res.render('project',{error:error.message});
    }
}

module.exports.sortProject=async(req,res)=>{
    const sortBy=req.query.sortBy;
    try{
        const projects=await Project.find().sort({[sortBy]:1});
        return res.render('home',{ projects: projects });
    }catch(err){
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.viewProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId).populate('issues');

        let filteredIssues = project.issues;
        if (req.query.issues) {
            filteredIssues = JSON.parse(req.query.issues);
        }

        return res.render('project-details', { project, issues: filteredIssues });
    } catch (error) {
        res.status(404).send('Project not found');
    }
};


module.exports.filteredProject=async(req,res)=>{
    try{
        console.log(req.params);
    }catch(error){

    }
}
module.exports.starProject = async(req,res)=>{
    try{
        const id=req.params.projectId;
        const project=await Project.findById(id);
        if(!project){
            return res.status(404).json({message:"project not found"});
        }
        project.starred=!project.starred;
        await project.save();
        return res.status(200).json(project);
    }catch(err){
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.deleteProject=async(req,res)=>{
    try{
        const projectId=req.params.projectId;
        const issuesToDelete = await Issue.find({ project: projectId });
        for(const issue of issuesToDelete){
            await Issue.findByIdAndDelete(issue._id);
        }
        await Project.findByIdAndDelete(projectId);
        return res.status(200).json({message:"deleted successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
