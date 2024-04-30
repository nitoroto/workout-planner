const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Workout Planner Server is running');
});

app.post('/login', (req, res) => {
  res.send('Login route');
});

app.post('/register', (req, res) => {
  res.send('Register route');
});

app.post('/workout', (req, res) => {
  res.send('Workout creation route');
});

app.get('/workouts', (req, res) => {
  res.send('Workouts retrieval route');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));