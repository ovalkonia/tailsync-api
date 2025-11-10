import ValidationError from "../errors/Validation.error.js";

export default (validator) => {
    return (req, res, next) => {
        const parsed = validator.safeParse(req.body);
        if (parsed.success) {
            req.body = parsed.data;
            return next();
        }

        const details = parsed.error.issues.reduce((acc, issue) => {
            const key = issue.path.at(0) ?? "root";

            acc[key] ??= [];
            acc[key].push({
                code: issue.code,
                message: issue.message,
            });

            return acc;
        }, {});

        throw ValidationError.INVALID_DATA(details);
    };
};

