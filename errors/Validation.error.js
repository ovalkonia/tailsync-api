import BaseError from "./Base.error.js";

export default class ValidationError extends BaseError {
    static INVALID_DATA(details) { return new this("Data is invalid", 400, details); }
};

