const express = require('express');
const bookModel = require('../models/bookModel');
const {createBook,
    updateBook,
    deleteBook,
    getBook,
    getSingleBook} = require('../controller/bookController')

const router = express.Router();

router.get('/', getBook); 

router.get('/:id', getSingleBook);

router.post('/', createBook); 

router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports = router 