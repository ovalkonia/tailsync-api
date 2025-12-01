import path from "path";

import multer from "multer";

import ApiError from "../errors/Api.error.js";

export default (sub, field) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join("public", "uploads", sub));
            },
            filename: (req, file, cb) => {
                const id = req.user._id;
                const timestamp = Date.now();
                const extension = path.extname(file.originalname);
                const name = `${id}-${timestamp}${extension}`;

                cb(null, name);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowed = ["image/jpeg", "image/png", "image/webp"];
            if (allowed.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(ApiError.BAD_REQUEST(), false);
            }
        },
        limits: {
            fileSize: 5242880,
            file: 1,
        },
        preservePath: false,
    }).single(field);
};

