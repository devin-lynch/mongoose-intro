// require the mongoose package
const mongoose = require('mongoose')

// define the 'child' sub document schema (comments)
const CommentSchema = new mongoose.Schema({
    header: {
        type: String
    },
    content: {
        type: String
    }
}, {
    timestamps: true
})

// define the 'parent' schema (blogs)
const BlogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    // 1:M embedded subdocument 1 blog can have many comments
    comments: [CommentSchema],
    // eventually we will add a reference to a user who made this blog
    blogger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

// create a model from the 'parent schema'
// export the parent model
module.exports = mongoose.model('Blog', BlogSchema)