import UserModel from "../models/User.model.js";
import AccessTokenUtil from "../utils/AccessToken.util.js";
import RefreshTokenUtil from "../utils/RefreshToken.util.js";

export default {
    post_register: async (req, res) => {
        const user_model = new UserModel(req.body);

        await user_model.save();

        return res.json({
            status: "success",
            message: "Successfully registered!",
        });
    },
    post_login: async (req, res) => {
        const user_model = await UserModel.findOne({ email: req.body.email }).exec();
        if (!user_model) {
            // TODO
            // throw custom error
            throw new Error("User not found");
        }

        if (user_model.password !== req.body.password) {
            // TODO
            // throw custom error
            throw new Error("Invalid credentials");
        }

        const refresh_token = RefreshToken.issue(user_model.id);
        const access_token = AccessToken.issue(user_model.id, user_model.role);

        // TODO
        // save refresh to the db

        return res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",
        }).json({
            status: "success",
            message: "Successfully logged in!",
            data: {
                access_token: access_token,
            },
        });
    },
    post_refresh: async (req, res) => {
        const user_refresh_token = RefreshToken.parse(req.cookies.refresh_token);
        if (!user_refresh_token.is_valid()) {
            // TODO
            // throw custom error
            throw new Error("Invalid user refresh token");
        }

        // TODO
        // compare to the token from the db

        // TODO
        // remove old refresh token

        const user_model = await UserModel.findById(user_refresh_token.user_id).exec();
        if (!user_model) {
            // TODO
            // throw custom error
            throw new Error("Unauthorized");
        }

        const refresh_token = RefreshToken.rotated(user_refresh_token);
        const access_token = AccessToken.issue(user_model.id, user_model.role);

        // TODO
        // sve new refresh token to the db

        return res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",
        }).json({
            status: "success",
            message: "Successfully refreshed!",
            data: {
                access_token: access_token,
            },
        });
    },
    post_logout: async (req, res) => {
        const refresh_token = RefreshToken.parse(req.cookies.refresh_token);

        // TODO
        // remove refresh token by id

        return res.clearCookie("refresh_token").json({
            status: "success",
            message: "Successfully logged out!",
        });
    },
};

