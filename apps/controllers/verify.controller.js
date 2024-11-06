const UserModel = require('../models/User.model');

const generateToken = require('../utils/generateToken.util');
const updateRefreshToken = require('../utils/updateRefreshToken.util');

class Verify {
    async index (req, res) {
        const data = req.body;
        if(!data.uid || !data.code) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const user = await UserModel.findById(data.uid);
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            const currentTime = new Date();
            const timeDifference = user.verificationCodeExpires - currentTime;
            const time = Math.floor(timeDifference / 1000);
            if(time < 0) return res.status(410).json({ message: 'Verification code expiredorized' });
            if(data.code !== user.verificationCode) return res.status(401).json({ message: 'Unauthorized' });
            await UserModel.findByIdAndUpdate(data.uid, { isVerified: true });
            const  { accessToken, refreshToken } = await generateToken(user);
            await updateRefreshToken(user._id.toString(), refreshToken);
            const uid = user._id.toString();
            return res.status(200).json({ uid, accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new Verify();