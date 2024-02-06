const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 6
    },
    userEmail: {
        type: String,
        required: true,
        min: 6
    },
    userPassword: {
        type: String,
        required: true,
        min: 6
    }, isAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports=mongoose.model('Users',schema);