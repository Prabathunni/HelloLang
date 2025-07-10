const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/db')
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(router)



PORT = process.env.PORT || 3000


app.get('/',(req,res)=>{
    res.send("HELLOLANG Server running...")
})

app.listen( PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
