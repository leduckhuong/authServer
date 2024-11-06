const UserModel = require('../models/User.model');

class Data {
    async index (req, res) {
        console.log('Is data');
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) return res.status(404).json({ message: 'Resource not found' });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new Data();