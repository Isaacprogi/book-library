const BookModel = require('../models/Book')
const userModel = require('../models/User')
const books = require('../utils/books');

const getBooks = async (req, res, next) => {
  try {
    let query = {};
    const { category, search } = req.query;
    console.log(req.query)

    if (category) {
      const regex = new RegExp(category, 'i'); 
      query.category = { $regex: regex };
    }

    else if (search) {
      const regex = new RegExp('^' + search, 'i');
      query.$or = [
        { filename: { $regex: regex } },
        { category: { $regex: regex } },
        { author: { $regex: regex } },
        { title: { $regex: regex } }
      ];
    }

    const books = await BookModel.find(query);
    res.status(200).json(books);
  } catch (error) {
    return next({ message: 'Internal Server Error', error });
  }
};


const addBook = async (req, res, next) => {
  try {
    for (const book of books) {
      const { title, author, category, filename} = book;
      const newBook = new BookModel({
        title,
        author,
        category,
        filename,
      });

      await newBook.save();
    }

    res.status(201).json({ message: 'Books added successfully' });
  } catch (error) {
    console.error(error);
    next({ message: 'Internal server error', error });
  }
};


const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      next({ status: 404, message: 'Book not found ' });
    }

    res.status(200).json(book);
  } catch (error) {
    return next({ message: 'Internal Server Error', error });
  }
};




const addBookToCollection = async (req, res, next) => {
  const creator = req.user;
  try {
    const user = await userModel.findOne({ _id: creator._id });
    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }
    user.bookCollection.push(req.params.id);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    next({ message: 'Internal server error' });
  }
};


const removeBookFromCollection = async (req, res, next) => {
  const creator = req.user;
  try {
    const user = await userModel.findOne({ _id: creator._id });
    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }

    const bookIndex = user.collection.indexOf(req.params.id);
    if (bookIndex > -1) {
      user.bookCollection.splice(bookIndex, 1);
    } else {
      return next({ status: 404, message: 'Book not found in collection' });
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    next({ message: 'Internal server error' });
  }
};



module.exports = {
  getBooks,
  getBook,
  addBook,
  addBookToCollection,
  removeBookFromCollection,
};
