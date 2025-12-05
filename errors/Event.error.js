import BaseError from "./Base.error.js";

export default class EventError extends BaseError {
    static DOESNT_EXIST() { return new this("Event doesn't exist", 404); }
};

