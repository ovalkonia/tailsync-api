import path from "path";

import multer from "multer";

import ApiError from "../errors/Api.error";

function destination(req, file, cb) {
    cb(null, path.join("public", "uploads", sub));
}

function filename(req, file, cb) {
    const id = req.user._id;
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const name = `${id}-${timestamp}${extension}`;

    cb(null, name);
}

function fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(ApiError.BAD_REQUEST(), false);
    }
}

const limits = {
    fileSize: 5242880,
    file: 1,
};

export default (sub, field) => {
    return multer({
        storage: multer.diskStorage({ destination, filename }),
        fileFilter,
        limits,
        preservePath: false,
    }).single(field);
};

