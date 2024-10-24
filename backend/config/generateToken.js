import jwt from 'jsonwebtoken';

const generateToken = async (_id) => {
    return await jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export default generateToken;