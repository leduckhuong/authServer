const UserModel = require('../models/User.model');

class UpdateInfo {
    async index (req, res) {
        console.log('Is login firebase');
        const data = req.body;
        if (!data.email || !data.uid) return res.status(400).json({ message: 'Invalid request data' });
        try {
            await UserModel.findByIdAndUpdate(data.uid, { name: data.name, email: data.email, birth: data.birth, add: data.add, phoneNum: data.phoneNum });
            return res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new UpdateInfo();