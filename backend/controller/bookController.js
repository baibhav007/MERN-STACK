const bookModel = require("../models/bookModel");
const mongoose = require("mongoose");

const getBook = async (req, res) => {
  const books = await bookModel.find({}).sort({ createdAt: -1 });
  res.status(201).json(books);
};

const getSingleBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Book found!!" });
  }

  const book = await bookModel.findById(id);
  res.status(200).json(book);
  if (!book) { 
    res.status(404).json({ error: "No Book found!!" });
  }
};

const createBook = async (req, res) => {
  const { title, quantity, category } = req.body;
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!quantity) {
    emptyFields.push('quantity')
  }
  if (!category) {
    emptyFields.push('category')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const book = await bookModel.create({ title, quantity, category });
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
const updateBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Book found!!" });
  }

  const book = await bookModel.findOneAndUpdate({ _id: id },{
    ...req.body
  });
  if (!book) {
    res.status(404).json({ error: "No Book found!!" });
  }
  res.status(200).json(book);
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "No Book found!!" });
    }
  
    const book = await bookModel.findByIdAndDelete({ _id: id });
    if (!book) {
      res.status(404).json({ error: "No Book found!!" });
    }
    res.status(200).json(book);
  };

module.exports = {
  getBook,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook
};
