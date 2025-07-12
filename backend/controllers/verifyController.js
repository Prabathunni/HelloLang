
const verifyloginController = async (req,res) => {
    console.log("Inside Verify Conctroller");
    try {
        const userID = req.userId;
        if(userID){
            res.status(200).json({valid:true})
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports=verifyloginController;