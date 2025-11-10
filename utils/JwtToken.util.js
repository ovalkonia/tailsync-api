import jwt from "jsonwebtoken";

export default class JwtTokenUtil {
    static parse(token, secret) {
        return new this(jwt.verify(token, secret));
    }

    static sign(data, secret) {
        return jwt.sign(data, secret, { noTimestamp: true });
    }

    sign(secret) {
        return this.constructor.sign(this.toJSON(), secret);
    }

    toJSON() {
        return Object.fromEntries(
            Object.entries(new this.constructor(this))
                .filter(([_, value]) => value !== undefined)
        );
    }
};

