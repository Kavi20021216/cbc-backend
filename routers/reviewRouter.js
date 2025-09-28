// import express from "express";
// import {
//   createReview,
//   getProductReviews,
//   getAllReviews,
//   updateReview,
//   deleteReview,
//   listPublicReviews,
// } from "../controllers/reviewController.js";

// const reviewRouter = express.Router();

// reviewRouter.get("/", listPublicReviews); 
// reviewRouter.post("/", createReview);
// reviewRouter.get("/product/:productId", getProductReviews);
// reviewRouter.get("/:page/:limit", getAllReviews);
// reviewRouter.put("/:reviewId", updateReview);
// reviewRouter.delete("/:reviewId", deleteReview);

// export default reviewRouter;

// import express from "express";
// import {
//   createReview,
//   getProductReviews,
//   getAllReviews,
//   updateReview,
//   deleteReview,
//   listPublicReviews,
//   getMyReview,
//   updateMyReview,
//   deleteMyReview,
// } from "../controllers/reviewController.js";

// const reviewRouter = express.Router();

// reviewRouter.get("/", listPublicReviews); 
// reviewRouter.post("/", createReview);


// reviewRouter.get("/my/:productId", getMyReview);
// reviewRouter.put("/my/:productId", updateMyReview);
// reviewRouter.delete("/my/:productId", deleteMyReview);


// reviewRouter.get("/product/:productId", getProductReviews);


// reviewRouter.get("/:page/:limit", getAllReviews);
// reviewRouter.put("/:reviewId", updateReview);
// reviewRouter.delete("/:reviewId", deleteReview);

// export default reviewRouter;

import express from "express";
import {
  listPublicReviews,
  getProductReviews,
  createReview,
  getMyReview,
  updateMyReview,
  deleteMyReview,
  getAllReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();


reviewRouter.get("/", listPublicReviews);
reviewRouter.get("/product/:productId", getProductReviews);


reviewRouter.post("/", createReview);
reviewRouter.get("/my/:productId", getMyReview);
reviewRouter.put("/my/:productId", updateMyReview);
reviewRouter.delete("/my/:productId", deleteMyReview);


reviewRouter.get("/:page/:limit", getAllReviews);
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
