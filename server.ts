import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Check for MongoDB URI
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    mongoose
      .connect(MONGODB_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } else {
    console.log("No MONGODB_URI provided. Skipping database connection for MVP preview.");
  }

  // Socket.IO Chat Architecture
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("send-message", (data) => {
      // Simulate saving to DB, then broadcast to room
      io.to(data.roomId).emit("receive-message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Mock API Routes (Replace with MongoDB controllers in production)
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.get("/api/user/profile", (req, res) => {
    res.json({
      name: "Alex Student",
      level: "Pro",
      xp: 4500,
      skills: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/alex",
      badges: ["Code Ninja", "30-Day Streak"]
    });
  });

  app.get("/api/mentors", (req, res) => {
    res.json([
      { id: "m1", name: "Sarah Engineer", level: "Senior", skills: ["System Design", "Go"] },
      { id: "m2", name: "John Doe", level: "Senior", skills: ["React", "UI/UX"] }
    ]);
  });

  app.get("/api/problems", (req, res) => {
    res.json([
      { id: "p1", title: "Two Sum", difficulty: "Easy", xp: 100 },
      { id: "p2", title: "Validate BST", difficulty: "Medium", xp: 300 },
      { id: "p3", title: "Merge k Sorted Lists", difficulty: "Hard", xp: 800 }
    ]);
  });

  // Vite Middleware for Development Full-Stack Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
