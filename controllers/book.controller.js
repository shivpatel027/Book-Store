const { books } = require('../models/book');    

exports.getAllBooks = (req, res) => {
  res.json(books);
};

exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);

  if(isNaN(bookId)) {
    return res.status(400).send('Invalid book ID');
  }
  const book = books.find(b => b.id === bookId);
  
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
};

exports.createBook = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).send('Title and author are required');
  }

  if (books.some(b => b.title === title)) {
    return res.status(400).send('Book with this title already exists');
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
}   

exports.deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);

  if(isNaN(bookId)) {
    return res.status(400).send('Invalid book ID');
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).send('Book not found');
  }
};
