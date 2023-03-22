import multer, { diskStorage } from "multer";
import { join } from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
