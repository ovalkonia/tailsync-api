import UserModel from "../models/User.model.js";

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
        // TODO

        return res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",
        }).json({
            status: "success",
            message: "Successfully logged in!",
            data: {
                access_token: null, // TODO
            },
        });
    },
    post_refresh: async (req, res) => {
        // TODO

        return res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",
        }).json({
            status: "success",
            message: "Successfully refreshed!",
            data: {
                access_token: null, // TODO
            },
        });
    },
    post_logout: async (req, res) => {
        // TODO

        return res.clearCookie("refresh_token").json({
            status: "success",
            message: "Successfully logged out!",
        });
    },
};

