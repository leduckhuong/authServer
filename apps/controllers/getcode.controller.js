const UserModel = require('../models/User.model');

const verifyEmailCode = require('../utils/verifyEmailCode.util');

class Getcode{
    async index (req, res) {
        const data = req.body;
        if(!data.id) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const user = await UserModel.findById(data.id);
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            const verificationCode = await verifyEmailCode(user.email);
            const verificationCodeExpires = new Date(Date.now() + 60000);
            await UserModel.findByIdAndUpdate(data.id, { verificationCode, verificationCodeExpires });
            return res.status(200).json({ expires: verificationCodeExpires.toString() });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new Getcode();