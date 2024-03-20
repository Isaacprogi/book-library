const router = require('express').Router();
const { addBook, getBooks, getBook, addBookToCollection, removeBookFromCollection } = require('../controllers/book');

router.get('/', getBooks);

router.get('/:id', getBook);

router.post('/', addBook);

router.put('/collection/:id', addBookToCollection);

router.delete('/collection/:id', removeBookFromCollection);

module.exports = router;
