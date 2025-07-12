import express from 'express'
import { getVotes } from '../controllers/vote.js'
import { validateSchema } from '../middlewares/validateSchema.js';
import { uuidSchema } from '../schemas/vote.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const vote = express.Router()

vote.get('/', authenticateToken, validateSchema({body: uuidSchema}), getVotes)

export default vote;