 import { db } from "../libs/db.js";

// ✅ 1. Get all submissions by logged-in user
export const getAllsubmission = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No submissions found for this user",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getAllsubmission:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 2. Get all submissions for a specific problem by the logged-in user
export const getAllsubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.params;

    const submissions = await db.submission.findMany({
      where: { userId, problemId },
      orderBy: { createdAt: "desc" },
    });

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No submissions found for this problem by the user",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getAllsubmissionForProblem:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 3. Get total number of submissions for a specific problem (all users)
export const getAllTheSubmissionForProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const totalSubmissions = await db.submission.count({
      where: { problemId },
    });

    return res.status(200).json({
      success: true,
      message: "Total submissions fetched successfully",
      count: totalSubmissions,
    });
  } catch (error) {
    console.error("Error in getAllTheSubmissionForProblem:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
