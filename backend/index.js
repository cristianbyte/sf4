import express from 'express'
import { corsMiddleware } from './config/cors.js'
import initDatabase, { PORT } from './config/config.js'
import user from './src/routes/user.js'
import { jsonSyntaxErrorHandler, errorHandler } from './src/middlewares/errorHandler.js'
import { logOrigin } from './src/middlewares/logOrigins.js'

const app = express()
app.disable('x-powered-by')

app.use(logOrigin);
app.use(corsMiddleware);
app.use(express.json())

app.use('/api', user)

app.use(jsonSyntaxErrorHandler)
app.use(errorHandler)

await initDatabase();
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
