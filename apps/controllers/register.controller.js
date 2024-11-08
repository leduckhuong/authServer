const cryptojs = require('crypto-js');

const UserModel = require('../models/User.model');

const verifyEmailCode = require('../utils/verifyEmailCode.util');
const generateToken = require('../utils/generateToken.util');
const updateRefreshToken = require('../utils/updateRefreshToken.util');

class Register{
    async index (req, res) {
        console.log('Is register');
        const data = req.body;
        if (!data.email || !data.pass) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        try {
            const oldUser = await UserModel.findOne({email: data.email});
            if (oldUser) return res.status(409).json({ message: 'Conflict: Duplicate data' });
            const verificationCode = await verifyEmailCode(data.email);
            const verificationCodeExpires = new Date(Date.now() + 60000);
            const passw = data.pass;
            const hashpw = cryptojs.SHA256(passw).toString();
            const userData = {
                email: data.email,
                hashpw,
                verificationCode,
                verificationCodeExpires
            }
            const user = await UserModel.create(userData);
            return res.status(201)
            .json({uid: user._id.toString(), expires: verificationCodeExpires.toString()});
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: 'Invalid request data', error: error.message });
            } else if (error.code === 11000) {
                console.log('1100');
                return res.status(409).json({ message: 'Conflict: Duplicate data' });
            } else {
                return res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        }
    }
    async firebase (req, res) {
        console.log('Is register firebase');
        const data = req.body;
        if (!data.email || !data.pass || !data.name) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        const passw = data.pass;
        const hashpw = cryptojs.SHA256(passw).toString();
        const userData = {
            email: data.email,
            hashpw,
            name: data.name,
            method: data.method
        }
        try {
            const user = await UserModel.create(userData);
            const  { accessToken, refreshToken } = await generateToken(user);
            await updateRefreshToken(user._id.toString(), refreshToken);
            const uid = user._id.toString();
            return res.status(201).json({uid, accessToken});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: 'Invalid request data', error: error.message });
            } else if (error.code === 11000) {
                console.log('1100');
                return res.status(409).json({ message: 'Conflict: Duplicate data' });
            } else {
                return res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        }
    }
}

module.exports = new Register();

