import jwt from 'jsonwebtoken';
import config from './config.json';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.jwt_secret, {
        expiresIn: '48h'
    })
}

export { getToken };