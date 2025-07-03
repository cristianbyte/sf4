import express from 'express'
import { PORT } from './config'

const app = express()

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
})
