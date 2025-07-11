import express from 'express'
import { corsMiddleware } from './config/cors.js'
import initDatabase, { PORT } from './config/config.js'
import user from './src/routes/user.js'
import vote from './src/routes/vote.js'
import { jsonSyntaxErrorHandler, errorHandler } from './src/middlewares/errorHandler.js'
import { logOrigin } from './src/middlewares/logOrigins.js'
import cookieParser from 'cookie-parser'

const app = express()
app.disable('x-powered-by')

//app.use(logOrigin);
app.use(corsMiddleware);
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', user)
app.use('/api/vote', vote)

app.use(jsonSyntaxErrorHandler)
app.use(errorHandler)

await initDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})