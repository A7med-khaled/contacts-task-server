const socketIO = require("socket.io");
let io

function initiate(server) {
    io = socketIO(server);
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}

function editEvent() {
    io.emit('edited');
}
module.exports = {
    initiate,
    editEvent
};