import express from "express";

import auth_middleware from "../middlewares/auth.middleware.js";
import upload_middleware from "../middlewares/upload.middleware.js";

import users_controller from "../controllers/users.controller.js";

const users_router = express.Router();

// GET

users_router.get("/users", users_controller.get_users);
users_router.get("/users/:id", users_controller.get_user);

// PATCH

users_router.patch("/users", auth_middleware(), users_controller.patch_user);
users_router.patch("/users/password", auth_middleware(), users_controller.patch_user);
users_router.patch("/users/name", auth_middleware(), users_controller.patch_user);
users_router.patch("/users/avatar", auth_middleware(), upload_middleware("avatars", "avatar"), (req, res, next) => {
    if (req.file) {
        req.body = {
            avatar: req.file.path.slice(6),
        };
    }

    next();
}, users_controller.patch_user);

// DELETE

users_router.delete("/users", auth_middleware(), users_controller.delete_user);

export default users_router;

