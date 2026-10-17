const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = "public/uploads/eventImages";

fs.mkdirSync(uploadDir, { recursive: true });

let counter = 0;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        counter++;

        const filename = "event-" + Date.now() + "-" + counter + path.extname(file.originalname);

        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only images are allowed"));
    }

    cb(null, true);
};

const uploadEventImages = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = uploadEventImages;