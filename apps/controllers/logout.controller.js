const UserModel = require('../models/User.model');

class Logout {
    async index (req, res) {
        console.log('Is logout');
        try {
            await UserModel.findByIdAndUpdate(req.userId, { refreshToken: null });
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new Logout();