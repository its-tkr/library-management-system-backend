const book = require('../models/bookmodel');


module.exports = {

    getAllBooks: async (req, res) => {
        await book.find().then((data) => {
            return res.status(200).send(data);
        }).catch((e) => {
            console.log("the error is", e);
            return res.status(400).send("Book Not Found");
        });
    },

    getOneBook: async (req, res) => {
        await book.findById(req.params.id).then((data) => {
            if(data){
                return res.status(200).send(data);
            }
            else{
                return res.status(404).send("Book Not Found");
            }
        }).catch((e) => {
            console.log("the error is", e);
            return res.status(400).send("Internal Server Error");
        });

    },

    addBook: async (req, res) => {
        const newBook = new book({
            title: req.body.title,
            author: req.body.author,
            categories: req.body.categories,
            volume: req.body.volume,
            year: req.body.year,
            edition: req.body.edition,
            language: req.body.language,
            pages: req.body.pages,
            description: req.body.description,
            available: req.body.available
        });

        await newBook.save().then((data) => {
            return res.status(200).send(data);
        }).catch((e) => {
            console.log("the error is", e);
            return res.status(400).send("Unable To Add Book");
        })
    },

    editBook: async (req, res) => {
        const updateBook = {
            title: req.body.title,
            author: req.body.author,
            categories: req.body.categories,
            volume: req.body.volume,
            year: req.body.year,
            edition: req.body.edition,
            language: req.body.language,
            pages: req.body.pages,
            description: req.body.description,
            available: req.body.available
        };
        await book.findByIdAndUpdate(req.params.id, updateBook, { new: true }).then((data) => {
            return res.status(200).send(data);
        }).catch((e) => {
            console.log("the error is", e);
            return res.status(400).send("Unable To Edit Book");
        })
    },

    deleteBook: async (req, res) => {
        await book.findByIdAndDelete(req.params.id).then((data) => {

            if(data){
                return res.status(200).send(data);
            }
            else{
                return res.status(404).send("Book Already Deleted");
            }

        }).catch((e) => {
            console.log("the error is", e);
            return res.status(400).send("Internal Server Error");
        })
    }
};