const mongoose = require('mongoose');
const User = require('../models/User')
const session = require('../models/session')
const CommentSchema = mongoose.Schema({

    comment: {
        type: String,
        required: true
    },

    author : {
        type : mongoose.Types.ObjectId,
        ref : "User" 
    },

    sessionId : {
        type :mongoose.Types.ObjectId,
        ref : "session"
    },


  
   
    
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;