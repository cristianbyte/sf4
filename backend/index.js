import express from 'express'
import initDatabase, { PORT } from './config/config.js'
import user from './src/routes/user.js'
import { jsonSyntaxErrorHandler } from './src/middlewares/errorHandler.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.use('/api', user)

app.use(jsonSyntaxErrorHandler)

await initDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
