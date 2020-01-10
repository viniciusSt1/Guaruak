const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { authConfig } = require('../../.env');
const User = require('../models/user');

function generateToken(params = {}){
    return jwt.sign(params, authConfig, {
        expiresIn: 86400
    });
}

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).send({ error: 'User not found ' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    return res.send({ 
        user, 
        token: generateToken({ id: user._id })
    });
});

router.post('/registrar', async (req, res) => {

    const { email } = req.body
    
    try {
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists' });
        }
        
        const user = await User.create(req.body);
        user.password = undefined;

        res.send({
            user,
            token: generateToken({ id: user._id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/validateToken', async (req, res) => {

    const authToken = req.body.token || '';

    if(!authToken)
        res.status(401).send({ error: 'No token provided' });

    const parts = authToken.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig, (err, decoded) => {
        if(err) 
            return res.status(401).send({ error: 'Token invalid' });

        return res.status(200).send({ valid: true });
    });
});

module.exports = app => app.use('/admin', router);