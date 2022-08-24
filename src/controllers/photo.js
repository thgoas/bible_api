
const multer = require('multer')
const multerConfig = require('../config/multer')

const upload = multer(multerConfig).single('photo')

class Photo {
    async store(req, res) {
        return upload(req, res, (error) => {
            if(error) {
                return res.status(400).json({
                    error:[error.code]
                })
            }
           return  res.json(req.file)
        })
        

    }
}

module.exports =  new Photo()