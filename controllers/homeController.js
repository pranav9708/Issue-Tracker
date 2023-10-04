const Project=require('../models/Project');

module.exports.renderHomePage=async (req,res)=>{
    try{
        const projects=await Project.find({});
    // const projects = [
    //     {
    //         name: 'Project 1',
    //         description: 'Description for Project 1',
    //         author: 'Author 1',
    //         openIssues: 5,
    //         starred: true,
    //     },
    //     {
    //         name: 'Project 2',
    //         description: 'Description for Project 2',
    //         author: 'Author 2',
    //         openIssues: 3,
    //         starred: false,
    //     },
    // ];

    return res.render('home',{ projects: projects });
    }catch(err){
        console.log(err);
    }
    
}