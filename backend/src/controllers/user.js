import { create } from '../services/user.js'

export const createUser = async (req, res) => {
  try {
    const user = await create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}