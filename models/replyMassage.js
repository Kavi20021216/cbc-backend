import mongoose from "mongoose";

const replyMassageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    massage: { type: String, required: true },
    date:{ type: Date, default: Date.now },
});


const replyMassage = mongoose.model("Reply", replyMassageSchema);

export default replyMassage;