import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, default: 0, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  // You can add more fields like price, location, images, etc. if needed
});

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;
