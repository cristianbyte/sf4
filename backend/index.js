import express from 'express'
import { corsMiddleware } from './config/cors.js'
import initDatabase, { PORT } from './config/config.js'
import user from './src/routes/user.js'
import vote from './src/routes/vote.js'
import { jsonSyntaxErrorHandler, errorHandler } from './src/middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import { methodNotAllowedHandler, notFoundHandler } from './src/middlewares/badRequest.js'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', () =>{
  console.log('User connected');
})

app.disable('x-powered-by')

// Routes
app.use(corsMiddleware);
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', user)
app.use('/api/vote', vote)

// Handle 405 Method Not Allowed
app.use(methodNotAllowedHandler);
// Handle 404 Not Found
app.use(notFoundHandler)

// Error handling middlewares
app.use(jsonSyntaxErrorHandler)
app.use(errorHandler)

await initDatabase();
server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})

export default app;