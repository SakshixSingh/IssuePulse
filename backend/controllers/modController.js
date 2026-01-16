import Issue from "../models/Issue.js";
import Report from "../models/Report.js";

// GET PENDING ISSUES
export const getPendingIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: "reported" }).populate("createdBy", "name email");
    res.status(200).json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFY ISSUE
export const verifyIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = "verified";
    issue.verifiedBy = req.user._id;
    await issue.save();

    res.status(200).json({ message: "Issue verified", issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// REJECT ISSUE
export const rejectIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = "closed";
    await issue.save();

    res.status(200).json({ message: "Issue rejected and closed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// MERGE ISSUES (Duplicate)
export const mergeIssues = async (req, res) => {
  try {
    const { sourceId, targetId } = req.body;

    const source = await Issue.findById(sourceId);
    const target = await Issue.findById(targetId);

    if (!source || !target) return res.status(404).json({ message: "Issue not found" });

    // Move reports from source to target
    await Report.updateMany({ issue: source._id }, { issue: target._id });

    // Update target reportCount
    const reportCount = await Report.countDocuments({ issue: target._id });
    target.reportCount = reportCount;
    await target.save();

    // Close source issue
    source.status = "closed";
    await source.save();

    res.status(200).json({ message: "Issues merged successfully", target });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
