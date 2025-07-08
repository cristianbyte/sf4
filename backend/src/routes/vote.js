import express from 'express'

const vote = express.Router()

vote.get('/', (req, res) =>{
    res.json({message: 'Youre voting'})
})

export default vote;