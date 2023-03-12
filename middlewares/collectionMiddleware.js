// authenticate jwt token
const passport = require('./passport')
const restrict = passport.authenticate('jwt', {
    session: false
})

// cloudinary
const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET
})

async function uploadCloudinary(filePath) {
    let result
    try {
        result = await cloudinary.uploader.upload(filePath, { use_filename: true })
        // setelah file berhasil diupload, hapus file yg di local
        fs.unlinkSync(filePath)
        return result.url
    } catch(err) {
        // jika gagal upload file, hapus file yg di local
        fs.unlinkSync(filePath)
        return null
    }
}

// multer
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // direktori dianggap dari root, karna folder 'images' ada di root, 
        // maka hanya './images', jika ada di dalam folder lain,
        // maka './folder_lain/images'
        callback(null, './images')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'application/pdf') 
            return callback(null, true)
        else {
            callback(null, false)
            return callback(new Error('only .png, .jpg, .jpeg and .pdf format allowed!'))
        }
    }
})

module.exports = {
    restrict,
    uploadCloudinary,
    upload
}