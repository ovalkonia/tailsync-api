export default class BaseError extends Error {
    constructor(message, code, details) {
        super(message);

        this.name = this.constructor.name;
        this.code = code ?? 500;
        this.details = details ?? {};
    }

    toJSON() {
        return {
            status: "error",
            message: this.message,
            name: this.name,
            code: this.code,
            details: this.details,
        };
    }
};

