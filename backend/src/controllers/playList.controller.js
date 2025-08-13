import { db } from "../libs/db.js";

// Create a playlist
export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    // Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const playList = await db.playlist.create({
      data: { name, description, userId },
    });

    res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playList,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ error: "Failed to create playlist" });
  }
};

// Get all playlists for a user
export const getPlayAllListDetails = async (req, res) => {
  try {
    const playLists = await db.playlist.findMany({
      where: { userId: req.user.id },
      include: { problems: { include: { problem: true } } },
    });

    res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playLists,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
};

// Get single playlist by ID
export const getPlayListDetails = async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).json({ error: "Playlist ID is required" });
  }

  try {
    const playList = await db.playlist.findUnique({
      where: { id: playlistId, userId: req.user.id },
      include: { problems: { include: { problem: true } } },
    });

    if (!playList) return res.status(404).json({ error: "Playlist not found" });

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playList,
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
};

// Add problems to playlist
export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!playlistId)
    return res.status(400).json({ error: "Playlist ID required" });
  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res.status(400).json({ error: "Invalid or missing problemIds" });
  }

  try {
    // Avoid duplicates
    const existing = await db.problemInPlaylist.findMany({
      where: { playListId: playlistId, problemId: { in: problemIds } },
      select: { problemId: true },
    });

    const existingIds = existing.map((p) => p.problemId);
    const newProblemIds = problemIds.filter((id) => !existingIds.includes(id));

    if (newProblemIds.length === 0) {
      return res
        .status(400)
        .json({ error: "All problems already in playlist" });
    }

    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: newProblemIds.map((problemId) => ({
        playListId: playlistId, // yaha bhi correct spelling
        problemId,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problems:", error.message);
    res.status(500).json({ error: "Failed to add problems to playlist" });
  }
};

// Delete a playlist
export const deletePlayList = async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId)
    return res.status(400).json({ error: "Playlist ID required" });

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: { id: playlistId },
    });
    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deletedPlaylist,
    });
  } catch (error) {
    console.error("Error deleting playlist:", error.message);
    res.status(500).json({ error: "Failed to delete playlist" });
  }
};

// Remove problems from playlist
// Remove problems from playlist
export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!playlistId)
    return res.status(400).json({ error: "Playlist ID required" });

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res.status(400).json({ error: "Invalid or missing problemIds" });
  }

  try {
    // ✅ Step 1: Check which problemIds exist in the playlist
    const existingProblems = await db.problemInPlaylist.findMany({
      where: {
        playListId: playlistId,
        problemId: { in: problemIds },
      },
      select: { problemId: true },
    });

    const validProblemIds = existingProblems.map(p => p.problemId);

    if (validProblemIds.length === 0) {
      return res
        .status(400)
        .json({ error: "No matching problems found in playlist" });
    }

    // ✅ Step 2: Delete only valid problemIds
    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playListId: playlistId,
        problemId: { in: validProblemIds },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problem(s) removed from playlist successfully",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error removing problems:", error.message);
    res
      .status(500)
      .json({ error: "Failed to remove problem(s) from playlist" });
  }
};

