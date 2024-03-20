require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');
const path = require('path')
const app = express();


const booksPath = path.join(__dirname, 'public', 'books');
app.use('/books', express.static(booksPath));


const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const mediaRoutes = require('./routes/media');


app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/media', mediaRoutes);

app.use(errorHandler);

connectDB(process.env.MONGO_URL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
