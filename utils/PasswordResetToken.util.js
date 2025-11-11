import { v4 as uuidv4 } from "uuid";

import JwtTokenUtil from "./JwtToken.util.js";

export default class PasswordResetTokenUtil extends JwtTokenUtil {
    constructor({
        jti,
        user_id,
        purpose,
        issued_at,
        absolute_exp,
    }) {
        super();

        this.jti = String(jti);
        this.user_id = String(user_id);
        this.purpose = String(purpose);
        this.issued_at = new Date(issued_at);
        this.absolute_exp = new Date(absolute_exp);
    }

    static parse(token) {
        return super.parse(token, process.env.JWT_PASSWORD_RESET_TOKEN_SECRET);
    }

    static sign(data) {
        return super.sign(data, process.env.JWT_PASSWORD_RESET_TOKEN_SECRET);
    }

    static issue(user_id) {
        return new this({
            jti: uuidv4(),
            user_id: user_id,
            purpose: "password_reset",
            issued_at: Date.now(),
            absolute_exp: Date.now() + 1000 * 60 * 10, // 10 minutes from now
        });
    }

    static equal(lhs, rhs) {
        return lhs.jti === rhs.jti &&
               lhs.user_id === rhs.user_id &&
               lhs.issued_at.getTime() === rhs.issued_at.getTime() &&
               lhs.absolute_exp.getTime() === rhs.absolute_exp.getTime();
    }

    equals(rhs) {
        return this.constructor.equal(this, rhs);
    }

    is_valid() {
        return this.purpose === "password_reset" &&
               this.absolute_exp.getTime() > Date.now();
    }
};

