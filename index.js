import express from "express";
import http from "http";
import ejs from "ejs";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";

const port = process.env.PORT || 3030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("driver-location", (data) => {
    io.emit("fetch-all-locations", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.get("/send-location", (req, res) => {
  res.render("senderIndex");
});

app.get("/", (req, res) => {
  res.render("viewerIndex");
});


server.listen(port, () => {
  console.log("Server is running on port", port);
});
