import multer from "multer";

// const storage = multer.diskStorage({
//     destination: "./images",
//     filename: function (req, file, cb) {
//       cb(null, file.filename)
//     }
//   })
  
const upload = multer({dest: "./images" })

export default upload;