import express from 'express'
import { getVotes, registryVote, getAllVotes } from '../controllers/vote.js'
import { validateSchema } from '../middlewares/validateSchema.js';
import { uuidSchema, voteSchema } from '../schemas/vote.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const vote = express.Router()
vote.get('/', getAllVotes)
vote.get('/:userId', authenticateToken, validateSchema({params: uuidSchema}), getVotes)
vote.post('/', authenticateToken, validateSchema({body: voteSchema}), registryVote)

export default vote;