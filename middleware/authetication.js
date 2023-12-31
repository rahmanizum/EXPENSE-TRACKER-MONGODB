const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secretKey = process.env.SECRET_KEY;

exports.authorization = async(request,response,next)=>{
    try {
        const token = request.headers.authorization;
        const decode = jwt.verify(token,secretKey);
        const {_id} = await User.fetchById(decode.userId); 
        request.userId = _id.toString();
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            response.status(401).json({ message: 'Time out please sign in' });
        } else {
            console.log('Error:', error);
            response.status(500).json({ message: 'Internal Server Error - please login again' });
        }
    }
}