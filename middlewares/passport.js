const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models/index')

const option = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'rahasia',
    
}

passport.use(new JwtStrategy(option, (payload, done) => {
    User.findOne({
        where: {id: payload.id}
    })
        .then(user => done(null, user))
        .catch(err => done(err, false))
}))

module.exports = passport
