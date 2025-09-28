// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   productId: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5,
//   },
//   comment: {
//     type: String,
//     default: "",
//   },
//   isApproved: {
//     type: Boolean,
//     default: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// reviewSchema.index({ productId: 1, email: 1 }, { unique: true });


// const Review = mongoose.model("reviews", reviewSchema);

// export default Review;

// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   email:     { type: String, required: true },
//   name:      { type: String, required: true },
//   rating:    { type: Number, required: true, min: 1, max: 5 },
//   comment:   { type: String, default: "" },
//   isApproved:{ type: Boolean, default: true }, 
//   date:      { type: Date, default: Date.now },
// });

// reviewSchema.index({ productId: 1, email: 1 }, { unique: true });

// const Review = mongoose.model("reviews", reviewSchema);
// export default Review;

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  email:     { type: String, required: true },
  name:      { type: String, required: true },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  comment:   { type: String, default: "" },
  isApproved:{ type: Boolean, default: true }, 
  date:      { type: Date, default: Date.now },
});

// one review per user per product
reviewSchema.index({ productId: 1, email: 1 }, { unique: true });

const Review = mongoose.model("reviews", reviewSchema);
export default Review;
