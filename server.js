const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

function handleError(error, res, next) {
    console.error(error.stack);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal Server Error';
    res.status(statusCode).send({ error: errorMessage });
}

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
    handleError(err, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));