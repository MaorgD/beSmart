const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIO = require('socket.io');
const {routesInit} = require("./routes/config_routes")
require("./db/mongoconnect");

const app = express();

// נותן גישה לכל הדומיינים לגשת לשרת שלנו
app.use(cors());
// כדי שנוכל לקבל באדי
app.use(express.json());
// הגדרת תקיית הפאבליק כתקייה ראשית
app.use(express.static(path.join(__dirname,"public")))

routesInit(app);

const server = http.createServer(app);

const io = socketIO(server);

let userCount = 1;

io.on('connection', socket => {
    userCount++;

    const username = `Guest ${userCount}`;

    socket.emit('SET_USERNAME', username);
    io.sockets.emit('CREATE_MESSAGE', {
        content: `${username} connected`
    });

    socket.on('SEND_MESSAGE', (messageObject) => {
        io.sockets.emit('CREATE_MESSAGE', messageObject);
    });

    socket.on('disconnected', () => {
        io.sockets.emit('CREATE_MESSAGE', {
            content: `${username} disconnected`
        })
    });
});

let port = process.env.PORT || 3003
server.listen(port);