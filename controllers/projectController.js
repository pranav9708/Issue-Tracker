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