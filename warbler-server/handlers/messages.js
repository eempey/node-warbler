const db = require('../models');

exports.createMessage = async function(request, response, next){
    try {
        let message = await db.Message.create({
            text: request.body.text,
            user: request.params.id
        });
        let foundUser = await db.User.findById(request.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return response.status(200).json(foundMessage);
    } catch(err) {
        return next(err);
    }
}

// GET - /api/users/:id/messages/:messge_id
exports.getMessage = async function(request, response, next){
    try {
        let message = await db.Message.find(request.params.message_id);
        return response.status(200).json(message);
    } catch(err){
        return next(err)
    }
}

exports.deleteMessage = async function(request, response, next){
    try {
        let foundMessage = await db.Message.findById(request.params.message_id);
        await foundMessage.remove();
        return response.status(200).json(foundMessage);
    } catch(err){
        return next(err);
    }
}