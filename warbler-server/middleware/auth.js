require('dotenv').config();
const jwt = require('jsonwebtoken');

// make sure the user is logged in 
exports.loginRequired = function(request, response, next){
    try {
        console.log('authorization', request.headers.authorization);
        const token = request.headers.authorization.split(' ')[1]; // Bearer kjfghfdkjhkjadhg
        console.log('token', token);
        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Please log in first'
                });
            }
        })
    } catch(err) {
        return next({
            status: 401,
            message: 'Please log in first'
        });
    }
    
}
//make sure we have the  correct user
exports.ensureCorrectUser = function(request, response, next){
    try {
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded){
            if(decoded && decoded.id === request.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
        })
    } catch(err) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
    }
};