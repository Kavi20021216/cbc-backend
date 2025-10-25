import Review from "../models/review.js";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

// Public: latest approved reviews (for homepage / initial load)
export async function listPublicReviews(req, res) {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ date: -1 }).limit(100);
    res.json(reviews);
  } catch (e) {
    console.error("Error listing reviews:", e);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
}

// Public: approved reviews for one product
export async function getProductReviews(req, res) {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ productId, isApproved: true }).sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
}

// User: create a review (approved immediately)
export async function createReview(req, res) {
  try {
    if (req.user == null) {
      res.status(401).json({ message: "Please login to add a review" });
      return;
    }

    const { productId, rating, comment } = req.body;
    if (!productId || !rating) {
      res.status(400).json({ message: "productId and rating are required" });
      return;
    }
    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: "Rating must be between 1 and 5" });
      return;
    }

    const product = await Product.findOne({ productId });
    if (product == null) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const existing = await Review.findOne({ productId, email: req.user.email });
    if (existing != null) {
      res.status(409).json({ message: "You have already reviewed this product" });
      return;
    }

    const review = new Review({
      productId,
      email: req.user.email,
      name: req.user.firstName + " " + req.user.lastName,
      rating,
      comment: comment || "",
      isApproved: true, // approved immediately
    });

    const result = await review.save();
    res.json({ message: "Review added successfully", review: result });
  } catch (error) {
    if (error && error.code === 11000) {
      res.status(409).json({ message: "You have already reviewed this product" });
      return;
    }
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
}

// User: get his/her own review for a product
export async function getMyReview(req, res) {
  try {
    if (req.user == null) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const productId = req.params.productId;
    const review = await Review.findOne({ productId, email: req.user.email });
    res.json(review);
  } catch (e) {
    console.error("Error getting my review:", e);
    res.status(500).json({ message: "Failed to fetch review" });
  }
}

// User: update his/her own review (stays approved)
export async function updateMyReview(req, res) {
  try {
    if (req.user == null) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const productId = req.params.productId;
    const { rating, comment } = req.body;

    if (rating != null && (rating < 1 || rating > 5)) {
      res.status(400).json({ message: "Rating must be between 1 and 5" });
      return;
    }

    const updated = await Review.findOneAndUpdate(
      { productId, email: req.user.email },
      {
        ...(rating != null ? { rating } : {}),
        ...(comment != null ? { comment } : {}),
        isApproved: true,       // keep approved
        date: new Date()
      },
      { new: true }
    );

    if (updated == null) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.json({ message: "Review updated", review: updated });
  } catch (e) {
    console.error("Error updating my review:", e);
    res.status(500).json({ message: "Failed to update review" });
  }
}

// User: delete his/her own review
export async function deleteMyReview(req, res) {
  try {
    if (req.user == null) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const productId = req.params.productId;
    const result = await Review.deleteOne({ productId, email: req.user.email });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json({ message: "Review deleted" });
  } catch (e) {
    console.error("Error deleting my review:", e);
    res.status(500).json({ message: "Failed to delete review" });
  }
}

// Admin: list all reviews (simple pagination)
export async function getAllReviews(req, res) {
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 10;

  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  try {
    const count = await Review.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const reviews = await Review.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 });

    res.json({ reviews, totalPages });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
}

// Admin: delete any review
export async function deleteReview(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  try {
    const reviewId = req.params.reviewId;
    const result = await Review.findByIdAndDelete(reviewId);
    if (result == null) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
}
