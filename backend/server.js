const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/db')
const http = require('http');
const setupSocket = require('./services/socket.js');



const app = express()

const server = http.createServer(app);
setupSocket(server)


PORT = process.env.PORT || 3000


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




app.get('/',(req,res)=>{
    res.send("HELLOLANG Server running...")
})

server.listen( PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
