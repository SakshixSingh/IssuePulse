import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    issueCount: {
      type: Number,
      default: 0
    },
    civicHealthScore: {
      type: Number,
      default: 100
    }
  },
  { timestamps: true }
);

export default mongoose.model("Area", areaSchema);
