const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },  
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Contact = model('Contact', contactSchema);

module.exports = Contact;