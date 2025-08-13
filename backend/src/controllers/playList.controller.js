import { db } from "../libs/db.js"

export const getPlayAllListDetails = async(req ,res ) =>{
    try {
        const userId = req.user.id
        const { name, description } = req.body

        const createPlayList = await db.pl
    } catch (error) {
        
    }
}

export const getPlayListDetails = async(req ,res ) =>{
    try {
        
    } catch (error) {
        
    }
}

export const createPlayList = async(req ,res ) =>{
    try {
        
    } catch (error) {
        
    }
}

export const addProblemToPlaylist = async(req ,res ) =>{
    try {
        
    } catch (error) {
        
    }
}

export const deletePlayList = async(req ,res ) =>{
    try {
        
    } catch (error) {
        
    }
}

export const removeProblemFromPlaylist = async(req ,res ) =>{
    try {
        
    } catch (error) {
        
    }
}