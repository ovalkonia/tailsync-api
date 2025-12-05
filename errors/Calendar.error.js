import BaseError from "./Base.error.js";

export default class CalendarError extends BaseError {
    static DOESNT_EXIST() { return new this("Calendar doesn't exist", 404); }
};

