const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    // array of object ids that reference the blogs that the user has made
    blogs: [{
        // tell mongoose that this is a reference
        type: mongoose.Schema.Types.ObjectId,
        // tell mongoose what is being referenced
        ref: 'Blog'
    }]
})

module.exports = mongoose.model('User', UserSchema)