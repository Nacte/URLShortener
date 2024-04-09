const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./utils/db');
const urlRoutes = require('./Routes/urlRoutes');

const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Use URL routes
app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {});
