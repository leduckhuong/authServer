const UserModel = require('../models/User.model');
const generateToken = require('../utils/generateToken.util');
const updateRefreshToken = require('../utils/updateRefreshToken.util');

const compare = require('../utils/compare.util');

class Login {
    async index (req, res) {
        console.log('Is login');
        const data = req.body;
        if (!data.email || !data.pass) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const user = await UserModel.findOne({ email: data.email });
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            if(!compare(data.pass, user.hashpw)) return res.status(401).json({ message: 'Unauthorized' });
            if(!user.isVerified) {
                return res.status(403).json({ message: "Account has not verified" });
            }
            const  { accessToken, refreshToken } = await generateToken(user);
            await updateRefreshToken(user._id.toString(), refreshToken);
            const uid = user._id.toString();
            return res.status(200).json({ uid, accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async firebase (req, res) {
        console.log('Is login firebase');
        const data = req.body;
        if (!data.email) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const user = await UserModel.findOne({ email: data.email });
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            const  { accessToken, refreshToken } = await generateToken(user);
            await updateRefreshToken(user._id.toString(), refreshToken);
            const uid = user._id.toString();
            return res.status(200).json({ uid, accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports =  new Login();