export default class BaseError extends Error {
    constructor(message, code) {
        super(message);

        this.name = this.constructor.name;
        this.code = code ?? 500;
    }

    toJSON() {
        return {
            status: "error",
            message: this.message,
            name: this.name,
            code: this.code,
        };
    }
};

