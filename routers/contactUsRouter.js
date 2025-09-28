import express from 'express';
import { createMessage, deleteMessage, getAllMassage, sendReply, updateStatus } from '../controllers/contactUsController.js';

const contactUsRouter = express.Router(); // Ensure this is the correct router

// Use the correct router name (contactUsRouter instead of orderRouter)
contactUsRouter.post("/", createMessage);
contactUsRouter.get("/:page/:limit", getAllMassage);
contactUsRouter.post("/:massageId", sendReply);
contactUsRouter.put("/:massageId", updateStatus);
contactUsRouter.delete("/",deleteMessage);
export default contactUsRouter;
