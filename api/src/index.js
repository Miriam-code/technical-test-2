require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

require("./mongo");

const { PORT, APP_URL } = require("./config.js");

const app = express();

const origin = [APP_URL, "https://join.le-stud.com"];

app.use(cors({ credentials: true, origin }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + "/../public"));

app.use("/user", require("./controllers/user"));
app.use("/project", require("./controllers/project"));
app.use("/activity", require("./controllers/activity"));
// chatroom 
app.use("/chatroom", require("./controllers/chatroom"));
//message
app.use("/message", require("./controllers/message"));

const d = new Date();

app.get("/", async (req, res) => {
  res.status(200).send("API LOCAL TIME :  " + d.toLocaleString());
});

const mongoose = require("mongoose");

const User = mongoose.model("user");
const Message = require('./models/message');

require("./passport")(app);

const http = require("http");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use(async (socket, next) => {
  try {
    const iduser = socket.handshake.query.userId;
    socket.userId = iduser;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {

  console.log("user Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("user Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {

    console.log("msg en couuuuuur...")

    if (message.trim().length > 0) {

      const user = await User.findOne({ _id: socket.userId });

      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        name: user.name,
        message: message,
      });

      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });

      await newMessage.save();

    }
  });
});


server.listen(PORT, () => console.log("Listening on port " + PORT));





