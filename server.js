const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.send('Workout Planner Server is running');
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

app.post('/login', (req, res, next) => {
  try {
    // Simulate login logic
    res.send('Login route');
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

app.post('/register', (req, res, next) => {
  try {
    // Simulate registration logic
    res.send('Register route');
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

app.post('/workout', (req, res, next) => {
  try {
    // Simulate workout creation logic
    res.send('Workout creation route');
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

app.get('/workouts', (req, res, next) => {
  try {
    // Simulate workout retrieval logic
    res.send('Workouts retrieval route');
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Determine error status code or default to 500
  const statusCode = err.statusCode || 500;
  // Determine error message
  const errorMessage = err.message || 'Internal Server Error';
  // Send error response
  res.status(statusCode).send({ error: errorMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));