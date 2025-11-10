import BaseError from "./Base.error.js";

export default class UserError extends BaseError {
    static WRONG_CREDENTIALS() { return new this("Wrong credentials", 401); }
};

