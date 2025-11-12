import cookie_parser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";

import error_middleware from "./middlewares/error.middleware.js";

import auth_router from "./routers/auth.router.js";

await mongoose.connect(process.env.URI_MONGODB);

const port = 8080;
const app = express();

// Global middlewares

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.URL_FRONTEND);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

// Routes

app.use(auth_router);

app.get("/ping", (req, res) =>{
    return res.send("pong");
})

app.all("*any", (req, res) => {
    return res.send("Endpoint not found!");
});

// Error middleware

app.use(error_middleware());

// Listen

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

