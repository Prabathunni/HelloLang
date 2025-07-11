const userModel = require('../model/userSchema.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    console.log("inside register controller");

    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }else {

            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                username,
                email,
                password: encryptedPassword
            });
            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
        }
        
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error",error: error.message });
        
    }
    
}

// Login
exports.login = async (req, res) => {
    console.log("inside login controller");
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username" });
        }else{
            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Add token to cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000 // 1 hour
            })

            res.status(200).json({
                message: "Login successful",
                token,
                user
            });
        }
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
        
    }
    
}
