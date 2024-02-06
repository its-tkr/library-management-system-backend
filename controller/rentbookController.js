const rentbook = require('../models/rentbookmodel');
const jwt = require('jsonwebtoken');
const book = require('../models/bookmodel');
const { ObjectId } = require('mongodb');
module.exports = {

    getAllRentBooks: async (req, res) => {
        await rentbook.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'bookDetail'

                }
                

            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetail'
                }
            },
            {
                $project:{
                    'userDetail.userPassword':0,
                    'userDetail._id':0,
                    'userDetail.__v':0,
                    'userDetail.isAdmin':0,
                    'bookDetail.__v':0,
                    'bookDetail._id':0,
                }
            }
        ]).then((doc) => {
            doc.forEach(element => {
                const today = new Date();
                const returnDay = new Date(element.returnDate);
                today > returnDay ? Object.assign(element, { rentExpired: true }) : Object.assign(element, { rentExpired: false });
            });
            return res.status(200).send(doc);
        }).catch((e) => {
            console.log(e)
            return res.status(400).send("unable to find rent books");
        })  
    },

    addRentBooks: async (req, res) => {
        const token = jwt.decode(req.header('auth-token'));
        const rentDate = new Date(req.body.rentDate);
        const returnDate = new Date(req.body.returnDate);
        const newBook = new rentbook({
            bookId: new ObjectId(req.params.bookId),
            userId: new ObjectId(token._id),
            rentDate: rentDate,
            returnDate: returnDate,
        });

        await book.findByIdAndUpdate(req.params.bookId, { $inc: { available: -1 } }).then(data => {
            newBook.save().then((data) => {
                return res.status(200).send(data);
            }).catch((e) => {
                console.log("the error is", e);
                return res.status(400).send("Unable To Add Book");
            })
        }).catch(e => {
            console.log("the error is", e);
            return res.status(400).send("Unable To Update Book");
        });

    },
    deleteRentBooks: async (req, res) => {

        await rentbook.deleteOne({ _id: req.params.rentBookId }).then(data => {
            book.findByIdAndUpdate(req.body.bookId, { $inc: { available: 1 } }).then(() => {
                res.status(200).send(data)
            });
        }).catch(e => {
            console.log(e); res.status(400).send("Unable to delete")
        }
        );
    },
    getRentBooksOfUser: async (req, res) => {

        const token = jwt.decode(req.header('auth-token'));
        const userId= new ObjectId(token._id)
        await rentbook.aggregate([
            {
                $match: { userId:userId }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'bookDetail'

                }
            }
        ]).then((doc) => {
            doc.forEach(element => {
                const today = new Date();
                const returnDay = new Date(element.returnDate);
                today > returnDay ? Object.assign(element, { rentExpired: true }) : Object.assign(element, { rentExpired: false });
            });
            return res.status(200).send(doc);
        }).catch((e) => {
            console.log(e)
        })
    },
}