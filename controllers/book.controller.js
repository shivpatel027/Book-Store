const { booksTable } = require('../models/book.model');
const db = require('../db');
const { eq, sql } = require('drizzle-orm');

exports.getAllBooks = async (req, res) => {
  try {
    const { search } = req.query;
    
    let books;
    
    if (search) {
      // Full-text search if search parameter exists
      books = await db.select()
        .from(booksTable)
        .where(
          sql`to_tsvector('english', ${booksTable.title} || ' ' || COALESCE(${booksTable.description}, '')) @@ plainto_tsquery('english', ${search})`
        );
    } else {
      // Get all books if no search parameter
      books = await db.select().from(booksTable);
    }
    
    return res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    const book = await db.select()
      .from(booksTable)
      .where(eq(booksTable.id, bookId))
      .limit(1);
    
    if (book && book.length > 0) {
      res.json(book[0]);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    return res.status(500).json({ error: 'Failed to fetch book' });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;
    
    if (!title || !authorId) {
      return res.status(400).send('Title and authorId are required');
    }
    
    const result = await db.insert(booksTable)
      .values({ title, description, authorId })
      .returning();
    
    res.status(201).json({ 
      message: "Book created successfully", 
      book: result[0] 
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({ error: 'Failed to create book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    await db.delete(booksTable)
      .where(eq(booksTable.id, bookId));
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ error: 'Failed to delete book' });
  }
};