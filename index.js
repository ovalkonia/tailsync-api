import cookie_parser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";

import error_middleware from "./middlewares/error.middleware.js";

import auth_router from "./routers/auth.router.js";

await mongoose.connect(process.env.MONGODB_URI);

const port = 8080;
const app = express();

// Global middlewares

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

