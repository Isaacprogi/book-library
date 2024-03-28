require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');
const path = require('path')
const app = express();
const axios = require('axios')
const fs = require('fs')


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
const userRoutes = require('./routes/user')


app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes)
app.use('/api/book', bookRoutes);
app.use('/api/media', mediaRoutes);

app.post('/api/submit-application', (req, res) => {

  const dataToSend = {
    action: "apply to remote agency",
    applicantName: "Isaac Anasonye",
    applicantEmail: "isaaconyes80@gmail.com"
  };

  let axiosConfig = {
    headers: {
     'Content-Type': 'application/json;charset=UTF-8',
     'Access-Control-Allow-Origin': '*',
   },
  };

  axios.post('https://automation.growth-agency.ch/webhook/applications', dataToSend, axiosConfig)
    .then(response => {
      res.json({ message: 'Application submitted successfully', response: response.data });
    })
    .catch(error => {
      console.error('Application submission error:', error.response.data);
      res.status(500).json({ message: 'Error submitting application', error: error.message });
    });
});



app.post('/api/submit-form', (req, res) => {
  // Extract base64 string from the request body
  const base64String = req.body.formIMGURL; // Adjust the property name based on your input

  // Decode the base64 string to binary data
  const binaryData = Buffer.from(base64String, 'base64');

  // Specify a path for the decoded image
  const imagePath = path.join(__dirname, 'decodedImage.png');

  // Write the binary data to a file
  fs.writeFile(imagePath, binaryData, (err) => {
      if (err) {
          console.error("Failed to write image", err);
          return res.status(500).send("Failed to process the image.");
      }

      console.log("Image saved successfully.");
      // Respond back
      res.send("Form submitted and image saved successfully.");
  });
});


app.use(errorHandler);

connectDB(process.env.MONGO_URL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
