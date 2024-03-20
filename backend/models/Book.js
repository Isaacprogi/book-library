const mongoose = require('mongoose');
const Schema = mongoose.Schema;;

const BookSchema = new Schema({
    filename: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        unique: false,
    },
    title: {
        type: String,
        required: false,
        unique: false,
    },
    author: {
        type: String,
        required: true,
        unique: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', BookSchema);
