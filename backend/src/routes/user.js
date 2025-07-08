import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { userSchema, loginSchema, uuidParam } from '../schemas/user.js'
import { createUser, destroyUser, logIn } from '../controllers/user.js'

const router = express.Router()

router.post('/user', validateSchema({body: userSchema}), createUser)
router.get('/user/login', validateSchema({body: loginSchema}), logIn)
router.delete('/user/:id', validateSchema({params: uuidParam}), destroyUser)

export default router;