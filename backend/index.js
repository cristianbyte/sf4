import { jsonSyntaxErrorHandler, errorHandler } from './src/middlewares/errorHandler.js'
import { methodNotAllowedHandler, notFoundHandler } from './src/middlewares/badRequest.js'
import initDatabase, { PORT } from './config/config.js'
import { corsConfig } from './config/cors.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from "cors";

// Rutas
import user from './src/routes/user.js'
import vote from './src/routes/vote.js'

// Socket logic
import registerSocketHandlers from './src/sokets/sokets.js'

const app = express()
const server = createServer(app)

// Configuración de socket.io
const io = new Server(server, {cors: corsConfig})

// 👉 aquí delegamos la lógica
registerSocketHandlers(io)

app.disable('x-powered-by')

// Middlewares
app.use(cors(corsConfig))
app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api/user', user)
app.use('/api/vote', vote)

// Handle 405 Method Not Allowed
app.use(methodNotAllowedHandler)
// Handle 404 Not Found
app.use(notFoundHandler)

// Error handling middlewares
app.use(jsonSyntaxErrorHandler)
app.use(errorHandler)

await initDatabase()

server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})

export default app
