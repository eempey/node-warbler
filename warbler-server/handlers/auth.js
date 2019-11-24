const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(request, response, next){
    try {
        // finding a user
        let user = await db.User.findOne({
            email: request.body.email
        });
        let { id, username, profileImageUrl } = user;
        console.log(request.body.password);
        let isMatch = await user.comparePassword(request.body.password);
        console.log('isMatch', isMatch);
        if (isMatch){
            let token = jwt.sign(
                {
                    id, 
                    username,
                    profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return response.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Email/Password.'
            })
        }
    } catch(e) {
        return next({ status: 400, message: 'Invalid Email/Password' });
    }
}

exports.signup = async function(request, response, next) {
    try {
        let user = await db.User.create(request.body);
        //create a user
        let {id, username, profileImageUrl } = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY
        );
        return response.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })
    } catch(err){
        //see what kind of error
        // if it is a certain error
        // respond with username/email already taken
        if (err.code === 11000) {
            err.message = 'Sorry, that username and/or email is taken';
        }
        return next({
            status: 400,
            message: err.message
        })

    }
}