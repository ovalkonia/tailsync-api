import { Resend } from "resend";
import ApiError from "../errors/Api.error.js";
import UserError from "../errors/User.error.js";
import RefreshTokenModel from "../models/RefreshToken.model.js";
import UserModel from "../models/User.model.js";
import AccessTokenUtil from "../utils/AccessToken.util.js";
import EmailConfirmTokenUtil from "../utils/EmailConfirmToken.util.js";
import RefreshTokenUtil from "../utils/RefreshToken.util.js";

export default {
    get_me: async (req, res) => {
        const myself = {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            avatar: req.user.avatar,
            role: req.user.role,
        };

        return res.json({
            status: "success",
            message: "Successfully got myself!",
            data: {
                me: myself,
            },
        });
    },
    post_register: async (req, res) => {
        const user_model = new UserModel(req.body);
        await user_model.save();

        return res.json({
            status: "success",
            message: "Successfully registered!",
        });
    },
    post_login: async (req, res) => {
        const user_document = await UserModel.findOne({ email: req.body.email }).exec();
        if (!user_document ||
            user_document.password !== req.body.password) {
            throw UserError.WRONG_CREDENTIALS();
        }

        const refresh_token_util = RefreshTokenUtil.issue(user_document.id);
        const access_token_util = AccessTokenUtil.issue(user_document.id, user_document.role);

        const refresh_token_model = new RefreshTokenModel(refresh_token_util.toJSON());
        await refresh_token_model.save();

        return res.cookie("refresh_token", refresh_token_util.sign(), {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",
        }).json({
            status: "success",
            message: "Successfully logged in!",
            data: {
                access_token: access_token_util.sign(),
            },
        });
    },
    post_refresh: async (req, res) => {
        const user_refresh_token_util = RefreshTokenUtil.parse(req.cookies.refresh_token);
        if (!user_refresh_token_util.is_valid()) {
            throw ApiError.UNAUTHORIZED();
        }

        const db_refresh_token_document = await RefreshTokenModel.findOne({ jti: user_refresh_token_util.jti }).exec();
        if (!db_refresh_token_document) {
            throw ApiError.UNAUTHORIZED();
        }

        const db_refresh_token_util = new RefreshTokenUtil(db_refresh_token_document.toJSON());
        if (!RefreshTokenUtil.equal(user_refresh_token_util, db_refresh_token_util)) {
            throw ApiError.UNAUTHORIZED();
        }

        await db_refresh_token_document.populate("user");
        await RefreshTokenModel.deleteOne({ jti: db_refresh_token_util.jti });

        const refresh_token = RefreshTokenUtil.rotate(db_refresh_token_util);
        const access_token = AccessTokenUtil.issue(db_refresh_token_document.user.id, db_refresh_token_document.user.role);

        const refresh_token_model = new RefreshTokenModel(refresh_token.toJSON());
        await refresh_token_model.save();

        return res.cookie("refresh_token", refresh_token.sign(), {
            httpOnly: true,
            // secure: true,
            sameSite: "Strict",
        }).json({
            status: "success",
            message: "Successfully refreshed!",
            data: {
                access_token: access_token.sign(),
            },
        });
    },
    post_logout: async (req, res) => {
        const refresh_token_util = RefreshTokenUtil.parse(req.cookies.refresh_token);

        await RefreshTokenModel.deleteOne({ jti: refresh_token_util.jti }).exec();

        return res.clearCookie("refresh_token").json({
            status: "success",
            message: "Successfully logged out!",
        });
    },
    post_password_reset: async (req, res) => {

    },
    post_password_reset_token: async (req, res) => {

    },
    post_email_confirm: async (req, res) => {
        const email_confirm_token_util = EmailConfirmTokenUtil.issue(req.user._id, req.user.email);
        const email_confirm_token = email_confirm_token_util.sign();

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: process.env.RESEND_FROM,
            to: req.user.email,
            subject: "Email Confirmation",
            html: `Confirm your email <a href="${[process.env.URL_FRONTEND]}/auth/email-confirm/${email_confirm_token}">here</a>`,
        });

        return res.json({
            status: "success",
            message: "Successfully sent the email confirmation letter!",
        });
    },
    post_email_confirm_token: async (req, res) => {
        const email_confirm_token_util = EmailConfirmTokenUtil.parse(req.params.token);
        if (!email_confirm_token_util.is_valid() ||
            email_confirm_token_util.user_id != req.user._id ||
            email_confirm_token_util.email !== req.user.email) {
            throw ApiError.UNAUTHORIZED;
        }

        // TODO set verified in the db

        return res.json({
            status: "success",
            message: "Successfully confirmed the email!",
        });
    },
};

