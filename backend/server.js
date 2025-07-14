const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
const cookieParser = require('cookie-parser')
const { app, server } = require('./services/socket')
require('dotenv').config()
require('./config/db')


// middleware
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173', //frontend
    credentials:true
}))
app.use(cookieParser())
app.use(router)

// Global error handler — must come AFTER all routes
app.use((err, req, res, next) => {
    console.error("🔥 GLOBAL ERROR:", err.stack || err.message);
    res.status(500).json({
        success: false,
        error: err.message || 'Something went wrong!',
    });
});


PORT = process.env.PORT || 3000


app.get('/',(req,res)=>{
    res.send("HELLOLANG Server running...")
})

server.listen( PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
