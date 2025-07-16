const express =require('express')
const cors = require('cors')
const router = require('./Routes/router.js')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/db.js')
const http = require('http');
const setupSocket = require('./services/socket.js');
const path = require('path');



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
    console.error(" GLOBAL ERROR:", err.stack || err.message);
    res.status(500).json({
        success: false,
        error: err.message || 'Something went wrong!',
    });
});


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}






app.get('/',(req,res)=>{
    res.send("HELLOLANG Server running...")
})

server.listen( PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
