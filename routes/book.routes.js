const express = require('express');
const router = express.Router();
router.get('/books', (req, res) => {
  res.json(books);
});
const controller = require('../controllers/book.controller');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', controller.createBook);
router.delete('/:id', controller.deleteBook);
module.exports = router;