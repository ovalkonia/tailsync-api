import express from "express";

import auth_middleware from "../middlewares/auth.middleware.js";

import auth_controller from "../controllers/auth.controller.js";

const auth_router = express.Router();

// GET

auth_router.get("/auth/me", auth_middleware(), auth_controller.get_me);

// POST

auth_router.post("/auth/register", auth_controller.post_register);
auth_router.post("/auth/login", auth_controller.post_login);
auth_router.post("/auth/refresh", auth_controller.post_refresh);
auth_router.post("/auth/logout", auth_controller.post_logout);
auth_router.post("/auth/password-reset", auth_controller.post_password_reset);
auth_router.post("/auth/password-reset/:token", auth_controller.post_password_reset_token);
auth_router.post("/auth/email-confirm/:token", auth_controller.post_email_confirm_token);

export default auth_router;

