import express from 'express'
import { PORT } from './config/config.js'

const app = express()

app.disable('x-powered-by')

app.post('/login', (req, res) => {})
app.post('/signin', (req, res) => {})
app.post('/logout', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
