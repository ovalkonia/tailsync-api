import ApiError from "../errors/Api.error.js";
import BaseError from "../errors/Base.error.js";

export default () => {
    return (err, req, res, next) => {
        const is_base_instance = err instanceof BaseError;
        if (!is_base_instance) {
            console.error("UNKNOWN ERROR:");
            console.error(err);
        }

        const base_error = is_base_instance ? err : ApiError.SERVER_ERROR();
        const payload = base_error.toJSON();

        return res.status(payload.code).json(payload);
    };
};

