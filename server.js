import app from "./src/app.js";
import http from "http";
import DBConnect from "./src/config/DBConnect.js";
import dotenv from "dotenv";

dotenv.config({
    path: ".env"
});

const {MONGO_URL, PORT, APP_URL} = process.env;

let port = normalizePort(PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log("listening on " + APP_URL);
    DBConnect(MONGO_URL);
});

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}