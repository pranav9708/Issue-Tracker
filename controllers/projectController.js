const Project=require('../models/Project');

module.exports.renderProjectPage=(req,res)=>{
    return res.render('project',{error:false});
}

module.exports.addProject=async (req,res)=>{
    try{
        await Project.create(req.body);
        return res.redirect('/home');
    }catch(error){
        res.render('/project/create',{error:error.message});
    }
}

module.exports.sortProject=async(req,res)=>{
    const sortBy=req.query.sortBy;
    try{
        const projects=await Project.find().sort({[sortBy]:1});
        console.log(projects);
        return res.render('home',{ projects: projects });
    }catch(err){
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.viewProject=async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);

        const issues=[
            {
                title: "issue1",
                description: "this is a new issue",
                author: "Pavan V",
                status:"open"
            }
        ]
        res.render('project-details', { project ,issues});
    } catch (error) {

        res.status(404).send('Project not found');
    }
}

module.exports.starProject = async(req,res)=>{
    try{
        const id=req.params.projectId;
        const project=await Project.findById(id);
        if(!project){
            return res.status(404).json({message:"project not found"});
        }
        console.log(project);
        project.starred=!project.starred;
        await project.save();
        return res.status(200).json(project);
    }catch(err){
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
