const mongoose =  require("mongoose");

const NotifSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },
    url:{
        type:String,
        required:true,
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
    createdAt:{
        type:Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Notification", NotifSchema);
