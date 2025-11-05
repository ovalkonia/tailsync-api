import JwtTokenModel from "./JwtTokenModel.domain.js";

export default class AccessTokenModel extends JwtTokenModel {
    constructor({
        user_id,
        user_role,
        issued_at,
        absolute_exp,
    }) {
        super();

        this.user_id = user_id;
        this.user_role = user_role;
        this.issued_at = new Date(issued_at);
        this.absolute_exp = new Date(absolute_exp);
    }

    static parse(token) {
        return super.parse(token, process.env.JWT_ACCESS_SECRET);
    }

    static sign(data) {
        return super.sign(data, process.env.JWT_ACCESS_SECRET);
    }

    static issue(user_id, user_role) {
        return new this({
            user_id: user_id,
            user_role: user_role,
            issued_at: Date.now(),
            absolute_exp: Date.now() + 1000 * 60 * 10, // 10 minutes from now
        });
    }

    is_valid() {
        return this.absolute_exp.getTime() > Date.now();
    }
}