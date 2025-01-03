const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const UPLOAD_FOLDER = path.join(__dirname, '../Upload/product/images'); 
// const UPLOAD_FOLDER = path.join('/tmp', './Upload/product/images');

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

const upload = multer({
  storage: storage,
  fileFilter
});


// const compressImage = async (req, res, next) => {
//   if (!req.files.images || req.files.images.length === 0) {
//     return next();
//   }
//   try {
//     req.files.images = await Promise.all(req.files.images.map(async (file) => {
//       const fileExt = path.extname(file.originalname);
//       const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
//       const outputPath = path.join(UPLOAD_FOLDER, fileName + fileExt);

//       await sharp(file.buffer)
//         .resize(800) // Resize the image to a width of 800px, maintaining aspect ratio
//         .toFormat('jpeg') // Convert to JPEG format
//         .jpeg({ quality: 80 }) // Set JPEG quality
//         .toFile(outputPath);

//       return {
//         ...file,
//         path: outputPath,
//         filename: fileName + fileExt
//       };
//     }));

//     next();
//   } catch (error) {
//     res.status(500).send('Error processing images');
//   }
// };

const compressImage = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next();
  }

  try {
    // Iterate over all fields in `req.files`
    for (const field in req.files) {
      // Process all files in the current field
      req.files[field] = await Promise.all(
        req.files[field].map(async (file) => {
          const fileExt = path.extname(file.originalname);
          const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now();
          const outputPath = path.join(UPLOAD_FOLDER, fileName + fileExt);

          await sharp(file.buffer)
            .resize(800) // Resize the image to a width of 800px, maintaining aspect ratio
            .toFormat("jpeg") // Convert to JPEG format
            .jpeg({ quality: 80 }) // Set JPEG quality
            .toFile(outputPath);

          // Return the updated file object
          return {
            ...file,
            path: outputPath,
            filename: fileName + fileExt,
          };
        })
      );
    }

    next();
  } catch (error) {
    console.error("Error processing images:", error.message);
    res.status(500).json({ message: "Error processing images", error: error.message });
  }
};


module.exports = {
  upload,
  compressImage,
};
