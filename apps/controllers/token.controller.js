const updateRefreshToken = require('../utils/updateRefreshToken.util');

class Token {
    async index (req, res) {
        console.log('Is token');
        const { uid } = req.body;
        if (!uid) return res.status(401).json({ message: 'Unauthorized: No refresh token provided' });
        try {
            const user = await UserModel.findById(uid);
            await jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const  { accessToken, refreshToken } = await generateToken(user);
            await updateRefreshToken(user._id.toString(), refreshToken);
            return res.status(200).json({ accessToken });
        } catch (error) {
            if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') return res.status(403).json({ message: 'Forbidden: Invalid or expired refresh token' });
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new Token();