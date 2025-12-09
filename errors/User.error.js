import BaseError from "./Base.error.js";

export default class UserError extends BaseError {
    static WRONG_CREDENTIALS() { return new this("Wrong credentials", 401); }
    static DOESNT_EXIST() { return new this("User doesn't exist", 404); }
    static ALREADY_JOINED() { return new this("User has already joined", 400); }
};

