import express from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { addProblemToPlaylist, createPlayList, deletePlayList, getPlayAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playList.controller.js";

const playListRoute = express.Router();

 
playListRoute.get("/get-all-playlist" , userMiddleware , getPlayAllListDetails)

playListRoute.get("/playlist/:playlistId" , userMiddleware , getPlayListDetails)

playListRoute.post("/create-playlist" ,userMiddleware ,  createPlayList)

playListRoute.post('/add-problem/:playlistId' , userMiddleware , addProblemToPlaylist)

playListRoute.delete("/delete-playlist/:playlistId" , userMiddleware , deletePlayList)

playListRoute.delete("/remove-problem/:playlistId" , userMiddleware , removeProblemFromPlaylist)



export default playListRoute;
