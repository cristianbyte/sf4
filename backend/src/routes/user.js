import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { userSchema, uuidParam } from '../schemas/user.js'
import { createUser, destroyUser } from '../controllers/user.js'

const router = express.Router()

router.post('/user', validateSchema({body: userSchema}), createUser)
router.delete('/user/:id',validateSchema({params: uuidParam}), destroyUser)

export default router;