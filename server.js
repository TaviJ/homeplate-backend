// npm
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');


// Import routers
const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const recipeRouter = require('./controllers/recipes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const PORT = process.env.PORT? process.env.PORT:3000;

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/recipes',recipeRouter);

// Start the server and listen on port 3000
app.listen(PORT, () => {
  console.log('The express app is ready!');
});
