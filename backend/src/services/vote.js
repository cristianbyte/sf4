import Vote from '../models/Vote.js';
import { HttpError } from '../error/HttpError.js'
import { findOpponent } from '../utils/fights.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fighterList = JSON.parse(readFileSync(join(__dirname, '../docs/fighters.json'), 'utf8'));
const fighters = fighterList.fighters;

export const getAllVotes = async () => {
    try {
        const votes = await Vote.getAllVotes();
        if (!votes || votes.length === 0) {
            return [];
        }
        const colVotes = votes
            .filter(vote => vote.isForeign == false)
            .map(({ isForeign, voteCount, ...rest }) => ({
                ...rest,
                voteCount: Number(voteCount)
            }));

        const foreignVotes = votes
            .filter(vote => vote.isForeign == true)
            .map(({ isForeign, voteCount, ...rest }) => ({
                ...rest,
                voteCount: Number(voteCount)
            }));

        const totalVotes = {};
        fighters.forEach(f => {
            totalVotes[f] = 0;
        })

        colVotes.forEach(v => {
            totalVotes[v.fighterName] += v.voteCount;
        })
        foreignVotes.forEach(v => {
            totalVotes[v.fighterName] += v.voteCount;
        })

        const formattedVotes = {
            col: colVotes,
            foreign: foreignVotes,
            total: totalVotes
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

