const mongoose =  require("mongoose");

const NotifSchema = new mongoose.Schema({
    receiver:{
        type:[mongoose.Schema.ObjectId],
        ref: "User",
        required:true,
    },
    url:{
        type:String
    },
    postId:{
        type:mongoose.Schema.ObjectId,
        
    },
    commentId:{
        type:mongoose.Schema.ObjectId
    },
    sender:{
        type: String,
        required: true
    },
    notifiedMessage:{
        type:String,
        required: true,
        trim: true,
    },
    type:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Notification", NotifSchema);