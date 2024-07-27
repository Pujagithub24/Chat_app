import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) => {
  
    try {
        const loggedInUserId = req.user._id;  //we able to get it from middleware

        //find all users from database but not one whose userid is loggedInUserId -> because we don't want
        //to send messages to ourselves
        // const allUsers = await User.find(); -> if we want to find all users
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");

         res.status(200).json(filteredUsers);

    } 

    catch (error) {
        console.error("error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}