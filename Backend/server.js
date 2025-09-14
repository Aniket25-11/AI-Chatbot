require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/service/ai.service');

const httpServer = createServer(app);

// Allow frontend connection
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Log engine-level connection errors for debugging
try {
  io.engine.on('connection_error', (err) => {
    console.error('Engine connection error:', err);
  });
} catch(e) {}


// Chat History (in-memory)
const chatHistory = [];

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // send history on connect
  socket.emit('chat-history', chatHistory);

  socket.on("disconnect", () => {
    console.log("⚠️ A user disconnected:", socket.id);
  });

  socket.on("ai-message", async (data) => {
    try {
      console.log("📩 AI message received:", data);

      // add user message to history
      chatHistory.push({
        id: `${Date.now()}-user`,
        role: "user",
        text: String(data),
        ts: Date.now()
      });

      // call AI service with chat history
      const response = await generateResponse(chatHistory);

      // add AI response to history
      chatHistory.push({
        id: `${Date.now()}-ai`,
        role: "model",
        parts: [{ text: response }]
      });

      console.log("📤 AI response:", response);

      // send the response back to the sender
      socket.emit("ai-message-response", {
        role: "assistant",
        text: response,
        ts: Date.now()
      });

      // if you want all connected clients to see the chatHistory, uncomment:
      // io.emit('chat-history', chatHistory);

    } catch (err) {
      console.error('Error handling ai-message:', err);
    }
  });
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 3000}`);
});
