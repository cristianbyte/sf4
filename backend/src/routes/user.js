import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { userSchema, loginSchema, uuidSchema, locationWithUuidSchema } from '../schemas/user.js'
import { createUser, destroyUser, logIn, logOut, getUserById, setLocation } from '../controllers/user.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const user = express.Router()

user.post('/', validateSchema({body: userSchema}), createUser) 
user.get('/:userId', authenticateToken, validateSchema({params: uuidSchema}), getUserById)
user.put('/setLocation', authenticateToken, validateSchema({body: locationWithUuidSchema}), setLocation)
// LogIn
user.post('/login', validateSchema({body: loginSchema}), logIn)
user.get('/logout', logOut)
// Delete User
user.delete('/:userId', authenticateToken, validateSchema({params: uuidSchema}), destroyUser)

export default user;