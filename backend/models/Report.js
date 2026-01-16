import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    comment: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
