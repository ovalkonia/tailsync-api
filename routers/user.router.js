import express from "express";

import auth_middleware from "../middlewares/auth.middleware.js";
import validation_middleware from "../middlewares/validation.middleware.js";

import user_controller from "../controllers/user.controller.js";
import { password_change_validator, name_change_validator } from "../validators/user.validators.js";

const user_router = express.Router();

// PATCH

user_router.patch("/user/password-change", auth_middleware(), validation_middleware(password_change_validator),
    user_controller.patch_password_change
);
user_router.patch("/user/name-change", auth_middleware(), validation_middleware(name_change_validator),
    user_controller.patch_name_change
);

export default user_router;

