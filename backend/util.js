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

const isAuth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        const jwtToken = token.slice(7, token.length)
        jwt.verify(jwtToken, config.jwt_secret, (err, token) => {
            if (err)
                return res.status(401).send({ message: 'Invalid Token' });
            req.user = token;
            next();
            return;
        })
    }
    else {
        return res.status(401).send({ msg: 'No Auth Token is present' });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Only Admin is allowed to access' });
}

export { getToken, isAuth, isAdmin };