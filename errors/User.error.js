import BaseError from "./Base.error.js";

export default class UserError extends BaseError {
    static WRONG_CREDENTIALS() { return new this("Wrong credentials", 401); }
    static INCORRECT_PASSWORD() { return new this("Current password is incorrect", 401); }
};

