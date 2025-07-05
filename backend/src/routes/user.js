import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { userSchema } from '../schemas/user.js'
import { createUser } from '../controllers/user.js'

const router = express.Router()

router.post('/user', validateSchema(userSchema), createUser)

export default router;