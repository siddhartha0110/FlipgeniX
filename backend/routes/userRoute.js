import express from 'express';
import User from '../models/Users';
import bcrypt from 'bcryptjs';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
    });
    if (!signinUser) {
        return res.status(400).send({ message: 'Email not registered' });
    }

    const validPass = await bcrypt.compare(req.body.password, signinUser.password);
    if (!validPass) {
        return res.status(400).send({ message: 'Incorrect Password' });
    }

    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ message: 'Invalid Email or Password' });
    }
})

router.get('/createadmin', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash('password', salt);
        const user = new User({
            name: 'Siddhartha Saxena',
            email: 'siddharthasaxena.1998@gmail.com',
            password: hashPass,
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(newUser);

    } catch (error) {
        res.send({ message: error.message })
    }

})

router.post('/register', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
    });

    if (signinUser) {
        return res.status(400).send({ message: 'Email already registered' });
    }

    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status(400).send({ message: 'All Fields must be filled' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    })
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    }
    else {
        res.status(401).send({ message: 'Invalid Details' });
    }
})

export default router;