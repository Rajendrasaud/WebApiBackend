const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const UserModel = new mongoose.Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_password: {
        type: String
    },
    user_image: {
        type: String
    },
    user_type: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserModel.statics.checkCrediantialsDb = async(email, password) => {
    const validateUser = await User.findOne({ user_email: email, user_password: password })
    return validateUser;
}

UserModel.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'usertoken')
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}

const User = mongoose.model('User', UserModel)
module.exports = User