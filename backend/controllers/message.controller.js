import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId , io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {

    console.log("message sent" , req.params.id);

    try {
        const {message} = req.body;
        const {id:receiverId} = req.params; //we get receiver id from params which is renamed as receiverId
        const senderId = req.user._id; //we get senderId from req.user._id because we add middleware

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId,receiverId]
            },
        });

        //if conversation does not exist then we create a new one
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId],
            });
        }

        const newMessage = new Message({
           senderId,
           receiverId,
           message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //these two will run sequentially
        // await conversation.save(); //we save our conversation in database
        // await newMessage.save();
         
        //this will run parallelly
        await Promise.all([conversation.save(),newMessage.save()]);


        //SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //io.to(<socket_id>).emit() used to send events to specific clients
            io.to(receiverSocketId).emit("newMessage" , newMessage);
        }

        res.status(201).json(newMessage);

    } 

    catch (error) {
        console.log("Error in send message controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};


export const getMessages = async (req,res) => {

    try {
     const {id:userToChatId} = req.params;
     const senderId = req.user._id; //coming from protect route function         
    
      const conversation = await Conversation.findOne({
        participants: {
            $all: [senderId,userToChatId]
        },
      }).populate("messages");  //not reference but actual messages
      //mongoose has a method called populate

       if(!conversation)
       return res.status(200).json([]);
       
       const messages = conversation.messages;

      res.status(200).json(messages);

    }
     catch (error) {
        console.log("Error in get messages controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}