import JwtTokenUtil from "./JwtToken.util.js";

export default class EmailConfirmTokenUtil extends JwtTokenUtil {
    constructor({
        user_id,
        email,
        purpose,
        issued_at,
        absolute_exp,
    }) {
        super();

        this.user_id = String(user_id);
        this.email = String(email);
        this.purpose = String(purpose);
        this.issued_at = new Date(issued_at);
        this.absolute_exp = new Date(absolute_exp);
    }

    static parse(token) {
        return super.parse(token, process.env.JWT_EMAIL_CONFIRM_TOKEN_SECRET);
    }

    static sign(data) {
        return super.sign(data, process.env.JWT_EMAIL_CONFIRM_TOKEN_SECRET);
    }

    static issue(user_id, email) {
        return new this({
            user_id: user_id,
            email: email,
            purpose: "email_confirm",
            issued_at: Date.now(),
            absolute_exp: Date.now() + 1000 * 60 * 10, // 10 minutes from now
        });
    }

    is_valid() {
        return this.purpose === "email_confirm" &&
               this.absolute_exp.getTime() > Date.now();
    }
};

