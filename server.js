const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

function logAndHandleError(error, response, next) {
    console.error(error.stack);
    const responseStatusCode = error.statusCode || 500;
    const responseErrorMessage = error.message || 'Internal Server Error';
    response.status(responseStatusCode).send({ error: responseErrorMessage });
}

app.get('/', (request, response) => {
    response.send('Workout Planner Server is running');
});

app.post('/login', (request, response) => {
    response.send('Login route');
});

app.post('/register', (request, response) => {
    response.send('Register route');
});

app.post('/workout', (request, response) => {
    response.send('Create Workout route');
});

app.get('/workouts', (request, response) => {
    response.send('Retrieve Workouts route');
});

app.use((error, request, response, next) => {
    logAndHandleError(error, response, next);
});

const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));