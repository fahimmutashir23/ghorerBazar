const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const UPLOAD_FOLDER = path.join(__dirname, '../../Upload/logo'); 
// const UPLOAD_FOLDER = path.join('/tmp', './Upload/profile/images');

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false)
  }
};

const uploadProfile = multer({
  storage: storage,
  fileFilter
});


const compressImageProfile = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    req.files = await Promise.all(req.files.map(async (file) => {
      const fileExt = path.extname(file.originalname);
      const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
      const outputPath = path.join(UPLOAD_FOLDER, fileName + fileExt);

      await sharp(file.buffer)
        .resize(200) // Resize the image to a width of 800px, maintaining aspect ratio
        .toFormat('jpeg') // Convert to JPEG format
        .jpeg({ quality: 70 }) // Set JPEG quality
        .toFile(outputPath);

      return {
        ...file,
        path: outputPath,
        filename: fileName + fileExt
      };
    }));

    next();
  } catch (error) {
    res.status(500).send('Error processing images');
  }
};

module.exports = {
  uploadProfile,
  compressImageProfile,
};
