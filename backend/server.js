const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const clubRoutes = require('./routes/club');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true 
}));

const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas with Mongoose");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
