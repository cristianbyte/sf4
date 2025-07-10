import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { userSchema, loginSchema, uuidParam } from '../schemas/user.js'
import { createUser, destroyUser, logIn } from '../controllers/user.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const user = express.Router()

user.post('/', validateSchema({body: userSchema}), createUser)
user.post('/login', validateSchema({body: loginSchema}), logIn)
user.delete('/:id', authenticateToken, validateSchema({params: uuidParam}), destroyUser)

export default user;