import express from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { addProblemToPlaylist, createPlayList, deletePlayList, getPlayAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playList.controller.js";

const playListRoute = express.Router();

 
playListRoute.get("/playlist" , userMiddleware , getPlayAllListDetails)

playListRoute.get("/playlist/:playlistId" , userMiddleware , getPlayListDetails)

playListRoute.post("/create-playlist" ,userMiddleware ,  createPlayList)

playListRoute.post('/:playlistId/add-problem' , userMiddleware , addProblemToPlaylist)

playListRoute.delete("/:playlistId" , userMiddleware , deletePlayList)

playListRoute.delete("/:playlistId/remove-problem" , userMiddleware , removeProblemFromPlaylist)



export default playListRoute;
