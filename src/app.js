import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from "./milddleware/errorHandler.js";
import api from "./routes/api.js";

dotenv.config({ path: "../.env" });

const __filename = fileURLToPath(import.meta.url);
process.env.APP_ROOT = path.dirname(__filename);
process.env.STATIC_DIR = path.join(process.env.APP_ROOT, 'public');

const app = express();

app.use(express.static(process.env.STATIC_DIR));

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());  // data sanitization aganist xss
app.use(compression());
app.use(helmet());  // set security http headers
app.use(cookieParser());


app.use("/api", api);

app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the API"
    });
});

app.use('*', function (req, res, next) {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
});

app.use(errorHandler);


export default app;