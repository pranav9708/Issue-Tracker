const mongoose=require('mongoose');

const issueSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    labels:{
        type:[String]
    },
    project:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Project',
        required: true
    },
    status:{
        type: String,
        required: true,
    },
    comments:{
        type:[String]
    }
})


issueSchema.pre('save', async function (next) {
    const Issue = this;

    try {
        const project = await mongoose.model('Project').findById(Issue.project);
        if (project) {
            if(!project.issues.includes(Issue._id)){
                project.issues.push(Issue._id);
                await project.save();
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});


const Issue=mongoose.model('Issue',issueSchema);
module.exports=Issue;