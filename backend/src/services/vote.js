import Vote from '../models/Vote.js';
import { HttpError } from '../error/HttpError.js'
import { findOpponent } from '../utils/fights.js';

export const getAllVotes = async () => {
    try {
        const votes = await Vote.getAllVotes();
        if (!votes || votes.length === 0) {
            return [];
        }
        const colVotes = votes
            .filter(vote => vote.isForeign == false)
            .map(({ isForeign, ...rest }) => rest);

        const foreignVotes = votes
            .filter(vote => vote.isForeign == true)
            .map(({ isForeign, ...rest }) => rest);

        const formattedVotes = {
            col: colVotes,
            foreign: foreignVotes
        }

        return formattedVotes;
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
    const existingVotes = await Vote.getVotesByUserId(data.userId);
    const opponent = await findOpponent(data.fighterName);

    if (existingVotes.some(vote => vote.voted_for === data.fighterName)) {
        throw new HttpError('You have already voted for this fighter', 409);
    }

    const actualVote = existingVotes.find(vote => vote.voted_for == opponent);
    if (actualVote) {
        try {
            const response = await Vote.updateVote({
                id: actualVote.id,
                fighterName: data.fighterName
            });
            return { message: 'Vote updated', ...response };
        } catch (error) {
            throw new HttpError('Unexpected error updating vote', 400);
        }
    }

    try {
        const response = await Vote.createVote(data);
        return { message: 'Vote created', ...response };
    } catch (error) {
        throw new HttpError('Unexpected error creating vote', 400);
    }
};

