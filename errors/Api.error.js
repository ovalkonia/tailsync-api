import BaseError from "./Base.error.js";

export default class ApiError extends BaseError {
    static BAD_REQUEST() { return new this("Bad Request", 400); }
    static UNAUTHORIZED() { return new this("Unauthorized", 401); }
    static FORBIDDEN() { return new this("Forbidden", 403); }
    static NOT_FOUND() { return new this("Not Found", 404); }
    static CONFLICT() { return new this("Conflict", 409); }
    static SERVER_ERROR() { return new this("Internal Server Error", 500); }
};

