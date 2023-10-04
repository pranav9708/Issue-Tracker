const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type: String,
        required: true,
    },
    createdDate:{
        type: Date,
        default:Date.now(),
    },
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
    starred:{
        type: Boolean,
        default: false,
    }
})

const Project=mongoose.model('Project',projectSchema);
module.exports=Project;