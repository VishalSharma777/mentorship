const express = require('express')
const app = express()
const { Connection } = require('./db')
const userRoutes = require('./routes/user')
const messageRoutes = require("./routes/message");
const sessionRoutes = require('./routes/session')
const commentRoutes = require('./routes/comment')

const cors = require('cors')


require('dotenv').config()
const port = process.env.PORT;

app.listen(port, () => {
    console.log("server started")
})
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))

Connection()


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/session', sessionRoutes);

app.use("/api/v1/messages", messageRoutes);
app.use('/api/v1/comments', commentRoutes);
