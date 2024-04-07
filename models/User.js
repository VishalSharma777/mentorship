const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: { type: String },
    gender: { type: String },
    address: { type: String },
    language: [{ type: String }],
    qualification: { type: String },
    skillLevel: { type: String },
    areaOfInterest: [{ type: String }],
    goal: { type: String },
    bio: { type: String },
    availability: [{ type: String }],
    additionalInfo: { type: String },
    image: { type: String },
    numberOfMentors: [{ type: Number }],
    typeOfUser : {
        type : String ,
        enum : [ "mentor" , "mentee"],
        },
    experience : {type:String}
    , noOfSessionsCreate : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Session"
    }],
    noOfSessionJoined : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Session"
    }]

})

const User = mongoose.model("User", userSchema);


module.exports = User;

