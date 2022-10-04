const db = require('./models')

const commentCrud = async () => {
    try {
        // make a blog to add comments to
        const newBlog = await db.Blog.findOneAndUpdate(
            { title: 'I love Mongoose! 🖤' },
            { body: 'you should really try mongoose, it is the cats meow' },
            { upsert: true, new: true }
        )

        console.log('newBlog:', newBlog)

        // comment CREATE
        // make new comment
        const newComment = {
            header: 'OMG So True 👏',
            content: 'I am also in love with mongoose!'
        }
        // push to array of comments
        newBlog.comments.push(newComment)
        // save the parent doc (this is the async operation)
        await newBlog.save() // this puts the comment in the db

        // comment READ
        // find a comment by id
        // not async
        const foundComment = newBlog.comments.id('633cba79c47c575c9ffed807')
        console.log('found a comment:', foundComment)

        // comment UPDATE
        // modify the properties of a comment
        foundComment.content = '🌧🌧🌧'
        // save the parent doc (this is async)
        await newBlog.save()


        // comment DESTROY
        // .remove() is a subdocument instance method
        newBlog.comments[1].remove() // remove comment at index 1
        // foundComment.remove() // makes a comment remove itself from the array
        // save the parent doc
        newBlog.save()

    } catch(err) {
        console.warn(err)
    }
}

commentCrud()