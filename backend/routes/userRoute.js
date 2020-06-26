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
        const hashPass = await bcrypt.hash('Sahil3012', salt);
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
export default router;