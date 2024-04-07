const Session = require('../models/session')
const User = require('../models/User')
const cloudinary = require("../utils/cloudinary");

 
const createSession = async (req, res) => {
    const user = req.user.user._id;

    

    const { title, description, domain, topic, timeField, date } = req.body;
    
    try {
        
        const newSession = await Session.create({
            title: title,
            description: description,
            domain: domain,
            topic: topic,
            timeField: timeField,
            date: date,
            author: user,
            image: req.file.path
        });

        return res.status(200).json(newSession);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error creating session." });
    }
};


const getAllSession = async(req,res) => {
    try {
        const user  = req.user.user._id
    const session = await Session.find()
    res.status(200).json(session)
    } catch (error) {
        return res.status(500).json({msg : "internal server error"})
    }

}

const getSessionBySessionId  = async(req,res) => {
    const user = req.user.user._id
    const {sessionId}  = req.params
    try {
        const session  = await Session.findById(sessionId)
        if (session) {
            return res.status(200).json(session)
        }else {
            return res.status(500).json({msg : "No Session found"})
        }

    } catch (error) {
        return res.status(500).json({error})

    }
}

const getSessionByMentorId = async (req, res) => {
    const { mentorId } = req.params;
    try {
        const sessions = await Session.find({ "author": mentorId });
        if (sessions.length > 0) {
            return res.status(200).json(sessions);
        } else {
            return res.status(404).json({ msg: "No sessions found for this mentor." });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error." });
    }
};

const updateSession = async(req,res) => {
    const user = req.user.user._id
    const {sessionId} = req.params
    try {
        const session = await Session.findById(sessionId)
        if(!session){
            return res.status(500).json({msg : "No session found"})
        }
        session.noOfMentees = session.noOfMentees || [];
            if (!session.noOfMentees.includes(user)) {
                session.noOfMentees.push(user);
                await session.save();
                return res.status(201).json({ msg: "Mentees Joined", session });

            }else {
                session.noOfMentees = session.noOfMentees || [];
            if (session.noOfMentees.includes(user)) {
                session.noOfMentees.pull(user);
                await session.save();
                return res.status(201).json({ msg: "mentees unJoined"  , session});

            }

            }
            

            
    } catch (error) {
        
    }

}

module.exports = {
    getAllSession ,
    getSessionBySessionId ,
    getSessionByMentorId ,
    createSession ,
    updateSession
}