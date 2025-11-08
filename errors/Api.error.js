import BaseError from "./Base.error.js";

export default class ApiError extends BaseError {
    static get BAD_REQUEST() { return new this("Bad Request", 400); }
    static get UNAUTHORIZED() { return new this("Unauthorized", 401); }
    static get FORBIDDEN() { return new this("Forbidden", 403); }
    static get NOT_FOUND() { return new this("Not Found", 404); }
    static get CONFLICT() { return new this("Conflict", 409); }
    static get SERVER_ERROR() { return new this("Internal Server Error", 500); }
};

