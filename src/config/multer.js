const multer = require("multer");
const {extname, resolve} = require('path')

const randomPhoto = () => Math.floor(Math.random() * 10000 + 10000)

module.exports ={
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg'){
            return cb(new multer.MulterError('file needs to be png or jpeg'))
        }
        cb(null, true)
    },
    storage: multer.diskStorage({
        destination:  (req, file, cb) =>{
            cb(null, resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            
            cb(null, `${Date.now()}_${randomPhoto()}${extname(file.originalname)}`)
        }
    })
}