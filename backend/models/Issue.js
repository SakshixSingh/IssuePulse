import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["pothole", "water", "electricity", "garbage", "other"],
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area"
    },
    status: {
      type: String,
      enum: ["reported", "verified", "in_progress", "resolved", "closed"],
      default: "reported"
    },
    reportCount: {
      type: Number,
      default: 1
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    images: [
      {
        url: String,
        public_id: String
      }
    ]
  },
  { timestamps: true }
);

// Geo index (IMPORTANT)
issueSchema.index({ location: "2dsphere" });

export default mongoose.model("Issue", issueSchema);
