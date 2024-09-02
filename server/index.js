import express from "express";
import cors from "cors";

import { InitiateMongoServer } from "./src/config/db.js";
import { authRoute } from "./src/routes/Auth/auth.routes.js";
import { postRoute } from "./src/routes/Post/post.routes.js";
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import path from 'path';
import { bookedRoute } from "./src/routes/Booked/booked.routes.js";
import { sendMail, transporter } from "./src/config/Email/emailConfig.js";

const __dirname = path.resolve();
dotenv.config();

let reactRoute = (req, res, next) => {
    res.sendFile(path.join(__dirname,'public', 'index.html')); // relative path
}

// database connection
const app = express();
InitiateMongoServer();

app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:5000000}));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", new authRoute().router);
app.use("/api/post", new postRoute().router);
app.use("/api/booked", new bookedRoute().router);

app.use(express.static('public'));

app.get("/*", reactRoute)

transporter.verify().then(console.log('Nodemailer connected')).catch(console.error);


const port = process.env.PORT || 80;
app.listen(port, console.log(`Listening on port ${port} ...`));



