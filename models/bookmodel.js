const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String, required: true
    },
    author: {
        type: String, required: true
    },
    categories: {
        type: String, required: true
    },
    volume: {
        type: String, required: true
    },
    year: {
        type: String, required: true
    },
    edition: {
        type: String
    },
    language: {
        type: String, required: true
    },
    pages: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    available: {
        type: Number, required: true
    }
});

module.exports=mongoose.model('Books',schema);