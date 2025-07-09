import Vote from '../models/Vote.js'
import { HttpError } from '../error/HttpError.js'

export const getVotes = async (data) => {
    try {
        const result = await Vote.getVotes(data);

        if (!result || result.length === 0) {
            throw new HttpError('No votes found.', 404);
        }

        const convert = result.map(v => v.voted_for)
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

