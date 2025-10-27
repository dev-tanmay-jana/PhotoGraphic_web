const Contact = require("../modles/contact-model");

const ContactControler = async (req, res) => {
    const { name, email, message } = req.body;  
    try {
        const newContact = await Contact.create({ name, email, message });
        // console.log(newContact);
        res.status(201).json({ contact: newContact });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = ContactControler;