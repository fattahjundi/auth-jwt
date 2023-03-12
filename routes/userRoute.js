const router = require('express').Router()
const { getUser, register, login, whoami, updatePhoto } = require('../controllers/authController')
const { restrict, uploadCloudinary, upload } = require('../middlewares/collectionMiddleware')

router.get('/user/:id', getUser)
router.post('/register', register)
router.post('/login', login)
// wajib pake 'restrict' biar token bisa dibaca dari header
router.get('/whoami', restrict, whoami)
router.put('/profile/update/:id', upload.single('avatar'), async (req, res, next)=>{
    const url = await uploadCloudinary(req.file.path)
    if(url) {
        req.query.url = url
        next()
    }
    else {
        res.send('upload gagal')
    }
}, updatePhoto)

module.exports = router