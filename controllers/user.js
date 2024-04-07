const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require("../utils/cloudinary");

const register = async (req, res) => {
    const { email, name, password ,typeOfUser} = req.body;
    try {
        if (!email || !name || !password) {
           return res.json({ mssg: "all fields are required" })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.json({ mssg: "user already exists" })
        }

       const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                name: name,
                email: email,
                password: hashedpassword ,
                typeOfUser:typeOfUser
            }

        )
        await newUser.save();

       return res.json({ mssg: "user created succesfully" })

    } catch (error) {
        res.json({ error: error })
    }
}

const login = async (req, res) => {
    const { email, password , typeOfUser} = req.body;
    try {
        if (!email || !password || !typeOfUser) {
            return res.json({ mssg: "all fileds are required" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({msg:"user not found"})
        }
        const comparepassword = await bcrypt.compare(password, user.password)
        if (comparepassword) {
            const token = jwt.sign({ user : user }, 'secret_key', { expiresIn: '1h' })
            return res.json({ mssg: "user logged in succesfully", user: user, token: token })
        }

    } catch (error) {
       return res.json(error);
    }
}


const editUser = async(req,res) => {
    const userId = req.user.user._id;
    const { name, email, skillLevel, phoneNumber, address, numberOfMentors, qualification , gender, language, goal, areaOfInterest, availability, bio, additionalInfo, experience } = req.body;
    try {
      const user=await User.findById(userId)
       if(!user) {
        return res.status(404).json({msg:"user not found"})
       }
       const updateduser = await User.findByIdAndUpdate(userId, {
        name : name ,
        email:email,
        skillLevel:skillLevel ,
        phoneNumber:phoneNumber ,
        address:address ,
        numberOfMentors : numberOfMentors ,
        qualification : qualification,
        gender : gender,
        language : language,
        goal : goal,
        areaOfInterest : areaOfInterest,
        availability : availability,
        bio : bio,
        additionalInfo : additionalInfo,
        experience : experience ,
        image : req.file.path
        
    }, { new: true });
     return res.status(200).json(updateduser)
    } catch (error) {
       return res.status(500).json(error)
    }
    
}

const getAllUserProfile = async (req, res) => {
    try {
      const mentees = await User.find();
      if (!mentees) {
        res.status(401).send("There are no profiles in the database yet.");
      } else {
        return res.json(mentees);
      }
    } catch (error) {
      console.error("Error fetching mentees:", error);
      return res.status(500).send("Internal server error");
    }
  };
  const getUserProfileById = async (req, res) => {
    const { userId } = req.params ;
    const user1 = req.user.user._id
    try {
      const user = await User. findOne({ _id : userId });
      if (!user) { 
        return res.status(404 ).send("The requested user is not available.");
      } 
      
      res.json(user); 
    } catch (err) { 
      console.log("Error getting user by  ID: ", err); 
      return res.status(500).send("Server Error"); 
    }
  }

  const getLoggedInUserProfile = async(req,res)=>{
    try {
        const userId = req.user.user._id
        const user = await User.findById(userId)
        if(!user) {
          return res.status(400).json("user not found")
        }
        return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json(error)
    }
  }


module.exports = {
    register,
    login,
    editUser,
    getAllUserProfile ,
    getLoggedInUserProfile,
    getUserProfileById

}
