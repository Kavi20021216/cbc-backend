import Contactus from "../models/contactUs.js";
import replyMassage from "../models/replyMassage.js";
import { isAdmin } from "./userController.js";
import nodemailer from "nodemailer";
const pw = "wtrgbunprtfjqmqt"


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kaveetharandili@gmail.com",
    pass: pw,
  },
});


export async function createMessage(req, res) {
    try {
       if (req.user == null) {
       res.status(401).json({ message: "Please login to add a review" });
       return;
       }
       const { name, email, massage } = req.body;

       if (!name || !email || !massage) {
         return res.status(400).json({ message: "All fields are required" });
       }

       const latestMsgId = await Contactus.find().sort({ date: -1 }).limit(1);

		   let msgId = "MSG00202";

		if (latestMsgId.length > 0) {
			
			const lastMsgIdInString = latestMsgId[0].massageId; //"CBC00635"
			const lastMsgIdWithoutPrefix = lastMsgIdInString.replace("MSG", ""); //"00635"
			const lastMsgIdInInteger = parseInt(lastMsgIdWithoutPrefix); //635
			const newMsgIdInInteger = lastMsgIdInInteger + 1; //636
			const newMsgIdWithoutPrefix = newMsgIdInInteger
				.toString()
				.padStart(5, "0"); // "00636"
			msgId = "MSG" + newMsgIdWithoutPrefix; // "MSG00636"
		}
       const newMessage = new Contactus({ 
        massageId:msgId,
        name: req.user.firstName + " " + req.user.lastName,
        email: req.user.email,
        massage:req.body.massage
        });
       const result = await newMessage.save();

       res.json({ message: "Message sent successfully", data: result });

    }catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
}

export async function getAllMassage(req,res) {
    const page = parseInt(req.params.page) || 1;
	const limit = parseInt(req.params.limit) || 10;

	if (req.user == null) {
		res.status(401).json({ message: "Please login to view massages" });
		return;
	}

    
    if (!isAdmin(req)) {
      return res.status(403).json({ message: "Access denied only" });
    }


    try{
            const query = { status: "pending" };
            const massageCount = await Contactus.countDocuments(query);
            const totalPages = Math.ceil(massageCount / limit);// Calculate total pages by rounding the division of total orders by limit
            const massages = await Contactus.find(query).skip((page-1) *limit).limit(limit).sort({ date: -1 });

             res.json({
				massages: massages,
				totalPages: totalPages,
			});
            
        
    }catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
}

export async function sendReply(req, res) {
    const msgid = req.params.massageId;
    const email = req.body.email;
    const replyText = req.body.reMassage; 
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Please login to reply to messages" });
        }
        if (!isAdmin(req)) {
            return res.status(403).json({ message: "Access denied only" });
        }

        const messageFind = await Contactus.findOne({ massageId: msgid });
        if (!messageFind) {
            return res.status(404).json({ message: "Message not found" });
        }

        const newReply = new replyMassage({ email: email, reMassage: replyText });
        await newReply.save();

        const mailOptions = {
            from: "kaveetharandili@gmail.com",
            to: email,
            subject: "Reply from CBC Cosmetics",
            text: `This is CBC Cosmetics: ${replyText}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Email sent successfully" });

    } catch (error) {
        console.error("Error sending reply:", error);
        res.status(500).json({ message: "Failed to create reply" });
    }
  }


 

export async function updateStatus(req, res) {
  try {
       
    if (req.user == null) {
		res.status(401).json({ message: "Please login to reply massage" });
		return;
	  }

    const msgId = req.params.messageId; 
    const status = req.body.status;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Update status using _id
    const updatedStatus = await Contactus.findOneAndUpdate(
      msgId,
      { status: status },
      { new: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({
      message: "Status updated successfully",
      status: updatedStatus,
    });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};


export async function deleteMessage(req, res) {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messageId = req.params.id;
    const result = await Contactus.findByIdAndDelete(messageId);

    if (!result) return res.status(404).json({ message: "Message not found" });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
}