import express from 'express'
import { getVotes } from '../controllers/vote.js'
import { validateSchema } from '../middlewares/validateSchema.js';
import { uuidSchema } from '../schemas/vote.js';

const vote = express.Router()

vote.get('/', validateSchema({body: uuidSchema }), getVotes)

export default vote;