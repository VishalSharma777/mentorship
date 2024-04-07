


const mongoose = require('mongoose')



require('dotenv').config()
const url = process.env.URL;

const Connection = () => {
      mongoose.connect(url).then(() => {
        console.log("concttioned!!!") })
    
}


module.exports = {
    Connection
}