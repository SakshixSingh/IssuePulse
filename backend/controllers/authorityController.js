import Issue from "../models/Issue.js";
import Area from "../models/Area.js";

// DASHBOARD: AREA STATS
export const getAreaDashboard = async (req, res) => {
  try {
    const areas = await Area.find();

    const dashboard = await Promise.all(
      areas.map(async (area) => {
        const issues = await Issue.find({ area: area._id });
        const total = issues.length;
        const resolved = issues.filter((i) => i.status === "resolved").length;

        // Average resolution time in hours
        const resolvedIssues = issues.filter((i) => i.status === "resolved");
        const avgResolutionTime =
          resolvedIssues.length === 0
            ? 0
            : Math.round(
                resolvedIssues.reduce(
                  (sum, i) => sum + (i.updatedAt - i.createdAt) / (1000 * 60 * 60),
                  0
                ) / resolvedIssues.length
              );

        return {
          area: area.name,
          totalIssues: total,
          resolvedIssues: resolved,
          unresolvedIssues: total - resolved,
          avgResolutionTime,
          civicHealthScore: area.civicHealthScore
        };
      })
    );

    res.status(200).json(dashboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
