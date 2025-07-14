import * as voteService from '../services/vote.js'

export const registryVote = async (req, res, next) =>{
    try{
        const voting = await voteService.registryVote(req.body);
        res.status(201).json(voting);
    }catch(err){
        next(err)
    }
}

export const getVotes = async (req, res, next) => {
    try{
        const {id} = req.params;
        const result = await voteService.getVotes(id);
        res.status(200).json(result)
    }catch(err){
        next(err)
    }
}

export const getAllVotes = async (req, res, next) => {
    try{
        const result = await voteService.getAllVotes();
        res.status(200).json(result);
    }catch(err){
        next(err)
    }
}