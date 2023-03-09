const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

const rahasia = 'rahasia'

const register = (req, res) => {
    const rawData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    // enkripsi password
    const encryptedPass = bcrypt.hashSync(rawData.password, 10)
    // insert data ke db
    User.create({
        username: rawData.username,
        password: encryptedPass,
        email: rawData.email
    }).then(result => {
        return res.json({
            id: result.id,
            username: result.username
        })
    })
}

const login = (req, res) => {
    const rawData = {
        username: req.body.username,
        password: req.body.password
    }

    User.findOne({
        where: {username: rawData.username}
    }).then(user => {
        // jika user tidak ada
        if(!user) 
            return res.json({message: 'User not found!'})

        // jika user ada, cek password
        const isPasswordValid = bcrypt.compareSync(rawData.password, user.password)
        if(!isPasswordValid)
            return res.json({message: 'Wrong password!'})

        // jika user dan password valid
        const accessToken = jwt.sign({
            id: user.id,
            username: user.username
        }, rahasia)

        return res.json({
            id: user.id,
            username: user.username,
            token: accessToken
        })
    })
}

const whoAmI = (req, res) => {
    const currentUser = req.user
    console.log(req.user.id);
    return res.json({
        id: req.user.id,
        username: currentUser.username
    })
}

module.exports = {
    register,
    login,
    whoAmI
}