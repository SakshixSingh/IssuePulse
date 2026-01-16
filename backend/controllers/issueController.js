import Issue from "../models/Issue.js";
import Report from "../models/Report.js";
import Area from "../models/Area.js";
import cloudinary from "../config/cloudinary.js";

// CREATE OR REPORT ISSUE
export const reportIssue = async (req, res) => {
  try {
    const { title, category } = req.body;
    
    // Handle location - could be JSON string or object
    let location;
    try {
      if (typeof req.body.location === 'string') {
        location = JSON.parse(req.body.location);
      } else if (req.body.location && typeof req.body.location === 'object') {
        location = req.body.location;
      } else if (req.body['location[lat]'] && req.body['location[lng]']) {
        // Handle FormData bracket notation
        location = {
          lat: parseFloat(req.body['location[lat]']),
          lng: parseFloat(req.body['location[lng]'])
        };
      } else {
        return res.status(400).json({ message: "Location is required" });
      }
    } catch (parseError) {
      return res.status(400).json({ message: "Invalid location format" });
    }

    if (!location.lat || !location.lng) {
      return res.status(400).json({ message: "Valid latitude and longitude are required" });
    }

    const userId = req.user._id;

    // 1️⃣ Check for duplicate issues nearby (50 meters radius)
    const existingIssue = await Issue.findOne({
      category,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.lng, location.lat]
          },
          $maxDistance: 50 // meters
        }
      },
      status: { $ne: "closed" }
    });

    if (existingIssue) {
      // If duplicate found, create a Report linked to existing Issue
      const report = await Report.create({
        issue: existingIssue._id,
        user: userId,
        comment: title
      });

      // Increment report count
      existingIssue.reportCount += 1;

      // ✅ If user uploaded an image for duplicate, add it to existing issue
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "issuepulse" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });

        existingIssue.images.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }

      await existingIssue.save();

      return res.status(200).json({
        message: "Existing issue updated with your report",
        issue: existingIssue,
        report
      });
    }

    // 2️⃣ If no duplicate, create new Issue
    const newIssue = new Issue({
      title,
      category,
      location: { type: "Point", coordinates: [location.lng, location.lat] },
      createdBy: userId
    });

    // ✅ Upload image if exists
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "issuepulse" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      newIssue.images.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }

    await newIssue.save();

    // Create first report
    const report = await Report.create({
      issue: newIssue._id,
      user: userId,
      comment: title
    });

    // Optional: update Area issueCount
    if (req.user.area) {
      const area = await Area.findById(req.user.area);
      if (area) {
        area.issueCount += 1;
        await area.save();
      }
    }

    res.status(201).json({ message: "New issue reported", issue: newIssue, report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET NEARBY ISSUES
export const getNearbyIssues = async (req, res) => {
  try {
    const { lat, lng, radius = 500 } = req.query;

    const issues = await Issue.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius)
        }
      },
      status: { $ne: "closed" }
    });

    res.status(200).json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE ISSUE
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("verifiedBy", "name email");

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    const reports = await Report.find({ issue: issue._id }).populate("user", "name");

    res.status(200).json({ issue, reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE ISSUE STATUS (Authority)
export const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = status;
    await issue.save();

    res.status(200).json({ message: "Issue status updated", issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
