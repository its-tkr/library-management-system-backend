const router=require('express').Router();
const {getAllBooks, getOneBook, addBook, editBook, deleteBook}=require('../controller/booksController');
const {auth}=require('../services/verifyToken');
router.get('/',auth,getAllBooks);
router.get('/:id',auth,getOneBook);
router.post('/',auth,addBook);
router.put('/:id',auth,editBook);
router.delete('/:id',auth,deleteBook);

module.exports=router;