const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads/articles");
  },
  filename: (req, file, cb) => {
    let filetype = "";
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-articles-" + Date.now() + "." + filetype);
  },
  
});

exports.upload = multer({ storage: storage });
