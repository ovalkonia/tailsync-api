import JwtTokenUtil from "./JwtToken.util.js";

export default class CalendarJoinTokenUtil extends JwtTokenUtil {
    constructor({
        user_id,
        calendar_id,
        purpose,
        issued_at,
        absolute_exp,
    }) {
        super();

        this.user_id = String(user_id);
        this.calendar_id = String(calendar_id);
        this.purpose = String(purpose);
        this.issued_at = new Date(issued_at);
        this.absolute_exp = new Date(absolute_exp);
    }

    static parse(token) {
        return super.parse(token, process.env.JWT_CALENDAR_JOIN_TOKEN_SECRET);
    }

    static sign(data) {
        return super.sign(data, process.env.JWT_CALENDAR_JOIN_TOKEN_SECRET);
    }

    static issue(user_id, calendar_id) {
        return new this({
            user_id: user_id,
            calendar_id: calendar_id,
            purpose: "calendar_join",
            issued_at: Date.now(),
            absolute_exp: Date.now() + 1000 * 60 * 60 * 24, // 24 hours from now
        });
    }

    is_valid() {
        return this.purpose === "calendar_join" &&
               this.absolute_exp.getTime() > Date.now();
    }
};

