const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const UPLOAD_FOLDER = path.join(__dirname, "../../Upload/banner/images");

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER); // Save all files (images and videos) in the folder
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG, PNG, and MP4 are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 400 * 1024 * 1024 }
});

const compressImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    req.files = await Promise.all(
      req.files.map(async (file) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
          file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now();
        const outputPath = path.join(UPLOAD_FOLDER, fileName + fileExt);

        if ([".jpg", ".jpeg", ".png"].includes(fileExt)) {
          await sharp(file.buffer)
            .resize(700) // Resize image to 700px width, maintaining aspect ratio
            .toFormat("jpeg") // Convert to JPEG
            .jpeg({ quality: 80 }) // Set JPEG quality to 80
            .toFile(outputPath);
        } 
        // else if (['.mp4', '.mkv', '.avi', '.mov'].includes(fileExt)) {
        //   await new Promise((resolve, reject) => {
        //     const tempInputPath = path.join(UPLOAD_FOLDER, fileName + '-temp' + fileExt);
        //     fs.writeFileSync(tempInputPath, file.buffer); // Save the buffer temporarily

        //     ffmpeg(tempInputPath)
        //       .output(outputPath)
        //       .videoCodec('libx264')
        //       .size('1280x720')
        //       .outputOptions('-crf 28')
        //       .on('end', () => {
        //         fs.unlinkSync(tempInputPath); // Remove temp file
        //         resolve();
        //       })
        //       .on('error', (err) => {
        //         fs.unlinkSync(tempInputPath); // Clean up temp file
        //         reject(err);
        //       })
        //       .run();
        //   });
        // } else {
        //   throw new Error(`Unsupported file type: ${fileExt}`);
        // }

        return {
          ...file,
          path: outputPath,
          filename: fileName + fileExt,
        };
      })
    );

    next();
  } catch (error) {
    res.status(500).send("Error processing images");
  }
};

module.exports = {
  upload,
  compressImage,
};
