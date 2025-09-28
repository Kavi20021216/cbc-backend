import mongoose from "mongoose";

const contactUs = new mongoose.Schema({
    massageId:{type:String, required: true ,  unique : true},
    email: { type: String, required: true },
    name: { type: String, required: true },
    massage: { type: String, required: true },
    status: {type: String,default:"pending"},
    date : {type : Date,default : Date.now}
});

const Contactus = mongoose.model("contact-us", contactUs);

export default Contactus ;