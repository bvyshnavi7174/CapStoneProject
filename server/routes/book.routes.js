const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

// GET /api/books - Retrieve books, optionally filtered by username
router.get('/', async (req, res) => {
  try {
    // Check if 'username' query parameter is provided
    const { username } = req.query;
    
    let query = {};
    if (username) {
      query.username = username;
    }

    // Find books based on the query
    const books = await Book.find(query);
    console.log('Books retrieved:', books);
    res.json(books);
  } catch (err) {
    console.error('Error retrieving books:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/books - Add a new book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/books/:id - Update an existing book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/books/update-status - Update the status of multiple books
router.put('/update-status', async (req, res) => {
  try {
    const books = req.body; // Array of books with new status
    const updatePromises = books.map(book => 
      Book.findByIdAndUpdate(book._id, { status: book.status }, { new: true })
    );
    const updatedBooks = await Promise.all(updatePromises);
    res.json(updatedBooks);
  } catch (err) {
    console.error('Error updating book statuses:', err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
