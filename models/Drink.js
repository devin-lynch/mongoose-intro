// require the mongoose package
const mongoose = require('mongoose')

// define the mongoose schema (key/value pairs of what our models should be)
// mongoose.Schema({ key/value pairs for the model }, { options object})
const DrinkSchema = new mongoose.Schema({
    name: {
        type: String
        // validations would go here
    },
    rating: {
        type: Number
    }
}, {
    timestamps: true
})

// turn the schema into a mongoose model
// export our mongoose model
// mongoose.model('strong of the model name', schema to turn into a model)
module.exports = mongoose.model('Drink', DrinkSchema)