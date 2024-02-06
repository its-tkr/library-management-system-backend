const { validateRegisterUser, validateLoginUser } = require('../services/validataion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');



module.exports = {

    registerUser: async (req, res) => {

        // Validating User Before Register
        const { error } = validateRegisterUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Checking If email is already exsist
        const emailExsist = await User.findOne({ userEmail: req.body.userEmail });
        if (emailExsist) return res.status(400).send("Email is associated with another Account");

        // Hasing Password
        const hashedpassword = await bcrypt.hash(req.body.userPassword, 10, (err, result) => {
            const user = new User({
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPassword: result,
                isAdmin: req.body.isAdmin,
            });

            try {
                user.save();
                return res.status(200).json({ user: user._id });
            }
            catch (e) {
                console.log("The Error is", e);
            }
        });


    },

    checkPassword: async (req, res) => {

        const user = await User.findById(req.params.id);

        // Comparing Hashed Password
        bcrypt.compare(req.body.userPassword, user.userPassword, (err, result) => {

            if (result) {
                return res.status(200).send(result);
            }
            else {
                return res.status(400).send(result);
            }

        });
    },

    updateUser: async (req, res) => {

        // Validating User Before Update
        const { error } = validateRegisterUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const hashedpassword = await bcrypt.hash(req.body.userPassword, 10, (err, result) => {
            const user = {
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPassword: result,
                isAdmin: req.body.isAdmin,
            };
            User.findByIdAndUpdate(req.params.id, user, { new: true }).lean().then((doc) => {
                delete doc.userPassword;
                res.status(200).send(doc);
            }).catch((err) => {
                console.log(err);
                return res.status(400).send("Internal Server Error");
            })
        });

    },

    loginUser: async (req, res) => {

        // Validating User Before Login
        const { error } = validateLoginUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Checking If user is  exsist
        const user = await User.findOne({ userEmail: req.body.userEmail });
        if (!user) return res.status(400).send("Email Not Found");

        // Comparing Hashed Password
        bcrypt.compare(req.body.userPassword, user.userPassword, (err, result) => {
            if (!result) return res.status(400).send("Password Doesnot Match");
            // Generating JWT token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            return res.status(200).send({ token: token, isAdmin: user.isAdmin });
        });
    },

    getUser: async (req, res) => {
        const user = await User.findById(req.params.id).lean().then((doc) => {
            delete doc.userPassword;
            return res.status(200).send(doc);
        }).catch((err) => {
            console.log(err);
            return res.status(400).send("Internal Server Error");
        });
    }
}