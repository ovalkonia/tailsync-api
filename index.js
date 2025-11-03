import express from "express";
import cookie_parser from "cookie-parser";

const port = 8080;
const app = express();

// Global middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

// Routes

app.all("*any", (req, res) => {
    return res.send("Endpoint not found!");
});

// Listen

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

