import Vote from '../models/Vote.js'
import { HttpError } from '../error/HttpError.js'

export const getVotes = async (data) => {
    try {
        const voted_for = await Vote.getVotes(data);
        
        if (!voted_for || voted_for.length === 0) {
            return [];
        }
        
        const convert = voted_for.map(v => v.voted_for);
        return convert;
    } catch (err) {
        throw new HttpError(err.message || 'Unexpected error', 400);
    }
}

export const registryVote = async (data) => {
    try {
        return result = await Vote.vote(data);
    } catch (error) {
        throw new HttpError('Request denied', 400)
    }
}

