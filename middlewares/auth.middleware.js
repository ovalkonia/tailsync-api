import ApiError from "../errors/Api.error.js";
import AccessTokenUtil from "../utils/AccessToken.util.js";

export default () => {
    return (req, res, next) => {
        const authorization_header = req.get("Authorization");
        if (!authorization_header || !authorization_header.startsWith("Bearer ")) {
            throw ApiError.UNAUTHORIZED;
        }

        const access_token_util = AccessTokenUtil.parse(authorization_header.slice(7));
        if (access_token_util.is_expired()) {
            throw ApiError.UNAUTHORIZED;
        }

        req.user = access_token_util.toJSON();

        return next();
    };
};

