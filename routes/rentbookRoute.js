const router=require('express').Router();
const{getAllRentBooks, addRentBooks,getRentBooksOfUser,deleteRentBooks}=require('../controller/rentbookController');
const {auth}=require('../services/verifyToken');
router.get('/',auth,getAllRentBooks);
router.delete('/:rentBookId',auth,deleteRentBooks);
router.get('/user',auth,getRentBooksOfUser);
router.post('/:bookId',auth,addRentBooks);

module.exports=router;