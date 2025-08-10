export const createProblem = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      difficulty,
      tags,
      userId,
      examples,
      constraints,
      hints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    if (req.user !== "ADMIN")
      return res
        .status(403)
        .json({ error: "You are not allowed to create a problem !" });

    try {
      for (const [language, solutionCode] of object.entries(codeSnippet)) {
        const languageId = getJudge0LanguageId(language)
      }
    } catch (error) {}
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Server error" });
  }
};

export const getAllProblems = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProblemById = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProblem = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProblem = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
