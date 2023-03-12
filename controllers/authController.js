const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
const rahasia = 'rahasia'

const getUser = (req, res) => {
    User.findOne({
        where: {id: req.params.id}
    }).then(result => {
        res.json({
            status: 200,
            message: 'success get user data',
            data: result
        })
    }).catch(err => res.json({
        status: 500,
        message: err
    }))
}

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
    }).catch(err => {
        return res.json({
            status: 500,
            message: err
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
            accessToken: accessToken
        })
    }).catch(err => {
        return res.json({
            status: 500,
            message: err
        })
    })
}

const whoami = (req, res) => {
    const currentUser = req.user
    // console.log(currentUser);
    return res.json({
        id: currentUser.id,
        username: currentUser.username
    }).catch(err => {
        return res.json({
            status: 500,
            message: err
        })
    })
}

const updatePhoto = (req, res) => {
    User.update({
        avatar: req.query.url
    }, {
        where: {id: req.params.id}
    }).then(result => {
        res.json({
            status: 200,
            message: 'photo updated',
            data: {
                id: req.params.id,
                url: req.query.url
            }
        })
    }).catch(err => {
        res.json({
            status: 500,
            message: err
        })
    })
}

module.exports = {
    getUser,
    register,
    login,
    whoami,
    updatePhoto
}