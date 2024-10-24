const jwt = require('jsonwebtoken')

const generateToken = async (_id) => {
    return await jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

module.exports = generateToken