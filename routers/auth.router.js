import express from "express";

import auth_controller from "../controllers/auth.controller.js";

const auth_router = express.Router();

// POST

auth_router.post("/auth/register", auth_controller.post_register);
auth_router.post("/auth/login", auth_controller.post_login);
auth_router.post("/auth/refresh", auth_controller.post_refresh);
auth_router.post("/auth/logout", auth_controller.post_logout);

export default auth_router;

