import Vote from '../models/Vote.js';
import { HttpError } from '../error/HttpError.js'
import { findOpponent } from '../utils/fights.js';

export const getAllVotes = async () => {
    try {
        const votes = await Vote.getAllVotes();
        return votes;
    } catch (err) {
        throw new HttpError('Unexpected error at: GetAllVotes', 400);
    }
}

export const getVotes = async (userId) => {
    try {
        const voted_for = await Vote.getVotesByUserId(userId);

        if (!voted_for || voted_for.length === 0) {
            return [];
        }

        const convert = voted_for.map(v => v.voted_for);
        return convert;
    } catch (err) {
        throw new HttpError('Unexpected error at: GetVotes', 400);
    }
}

export const registryVote = async (data) => {
    const existingVotes = await getVotes(data.userId);
    const opponent = await findOpponent(data.fighterName);
    
    if (existingVotes.some(vote => vote === data.fighterName)) {
        throw new HttpError('You have already voted for this fighter', 409);
    }
    if (existingVotes.some(vote => vote === opponent)) {
        throw new HttpError('You have already voted for this fight', 409);
    }
    
    try {
        const response = await Vote.createVote(data);
        return response;
    } catch (error) {
        throw new HttpError('Unexpected error at: RegistryVote', 400);
    }
}

