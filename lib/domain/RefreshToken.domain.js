import { v4 as uuidv4 } from "uuid";

import JwtToken from "./JwtToken.domain.js";

export default class RefreshToken extends JwtToken {
    constructor({
        id,
        user_id,
        issued_at,
        sliding_exp,
        absolute_exp,
    }) {
        super();

        this.id = id;
        this.user_id = user_id;
        this.issued_at = new Date(issued_at);
        this.sliding_exp = new Date(sliding_exp);
        this.absolute_exp = new Date(absolute_exp);
    }

    static parse(token) {
        return super.parse(token, process.env.JWT_REFRESH_SECRET);
    }

    static sign(data) {
        return super.sign(data, process.env.JWT_REFRESH_SECRET);
    }

    static issue(user_id) {
        return new this({
            id: uuidv4(),
            user_id: user_id,
            issued_at: Date.now(),
            sliding_exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days from now
            absolute_exp: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days from now
        });
    }

    static rotate(refresh_token) {
        return new this({
            id: uuidv4(),
            user_id: refresh_token.user_id,
            issued_at: refresh_token.issued_at,
            sliding_exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days from now
            absolute_exp: refresh_token.absolute_exp,
        });
    }

    rotated() {
        return this.constructor.rotate(this);
    }

    static equal(lhs, rhs) {
        return lhs.id === rhs.id &&
               lhs.user_id === rhs.user_id &&
               lhs.issued_at.getTime() === rhs.issued_at.getTime() &&
               lhs.sliding_exp.getTime() === rhs.sliding_exp.getTime() &&
               lhs.absolute_exp.getTime() === rhs.absolute_exp.getTime();
    }

    equals(rhs) {
        return this.constructor.equal(this, rhs);
    }

    is_valid() {
        return this.sliding_exp.getTime() > Date.now() &&
               this.absolute_exp.getTime() > Date.now();
    }
}