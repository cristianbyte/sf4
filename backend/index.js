import { jsonSyntaxErrorHandler, errorHandler } from './src/middlewares/errorHandler.js'
import { methodNotAllowedHandler, notFoundHandler } from './src/middlewares/badRequest.js'
import initDatabase from './config/config.js'
import { corsConfig } from './config/cors.js'
import { createServer as createHttpServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from "cors"
import path from "path"
import fs from "fs"

// Rutas
import user from './src/routes/user.js'
import vote from './src/routes/vote.js'

// Socket logic
import registerSocketHandlers from './src/sokets/sokets.js'

const app = express()
let server

if (process.env.NODE_ENV === 'development') {
  const certDir = "/home/redev/.vite-plugin-mkcert"

  const key = fs.readFileSync(path.join(certDir, "dev.pem"))
  const cert = fs.readFileSync(path.join(certDir, "cert.pem"))

  server = createHttpsServer({ key, cert }, app)
  console.log("[MODE]: HTTPS")
} else {
  server = createHttpServer(app)
}

// Configuración de socket.io
const io = new Server(server, { cors: corsConfig })
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

const PORT = process.env.PORT || 8080
server.listen(PORT, '0.0.0.0', () => {
  const protocol = process.env.NODE_ENV === 'development' ? 'https' : 'http'
  console.log(`Server is running on: ${protocol}://0.0.0.0:${PORT}`)
})

export default app
