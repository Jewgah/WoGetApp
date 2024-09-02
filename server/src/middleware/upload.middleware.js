const multer = require("multer");
const fs = require('fs');
const path = require('path');

export const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        try {
          let paths=path.join(__dirname, '../../../../Shared', 'uploads/images');
          fs.mkdirSync(paths, { recursive: true })
          cb(null, paths)
  
        } catch (error) {
          console.error('err upload' + error);
  
        }
      },
      filename: function (req, file, cb) {
        try {
          const extArray = file.mimetype.split("/");
          const extension = extArray[extArray.length - 1];
          cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
        } catch (error) {
          console.error('err upload fn' + error);

        }
      }
    })
  })
