import ApiError from "../errors/Api.error.js";
import UserModel from "../models/User.model.js";
import AccessTokenUtil from "../utils/AccessToken.util.js";

export default () => {
    return async (req, res, next) => {
        const authorization_header = req.get("Authorization");
        if (!authorization_header || !authorization_header.startsWith("Bearer ")) {
            throw ApiError.UNAUTHORIZED();
        }

        const access_token_util = AccessTokenUtil.parse(authorization_header.slice(7));
        if (!access_token_util.is_valid()) {
            throw ApiError.UNAUTHORIZED();
        }

        const user_document = await UserModel.findById(access_token_util.user_id).exec();
        if (!user_document) {
            throw ApiError.UNAUTHORIZED();
        }

        req.user = user_document.toJSON();

        return next();
    };
};

