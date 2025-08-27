import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function registerSocketHandlers(io) {
  // Authentication middleware in the handshake
  io.use((socket, next) => {
    try {
      const rawCookies = socket.handshake.headers.cookie || "";
      const parsedCookies = cookie.parse(rawCookies);
      const token = parsedCookies.token;

      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = payload;
        console.log("Authenticated user:", payload.email);
      } else {
        socket.user = null;
        console.log("Anonymous user connected:", socket.id);
      }

      next();
    } catch (err) {
      console.error("Error authenticating socket:", err.message);
      socket.user = null;
      next();
    }
  });

  // Connection handler
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    // Listen for client messages
    socket.on("chat_message", (msg) => {
      if (!socket.user) {
        console.log("Anonymous user tried to send a message");
        return; // ignore
      }

      console.log(`Message from ${socket.user.email}:`, msg);
      io.emit("chat_message", { user: socket.user.email, msg });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

