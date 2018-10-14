const express = require('express');
const cors = require('cors');
const {events} = require('./events.js');

const app = express();

let startTime = null;

app.use(cors());

app.get('/status', (req, res) => {
    const currentTime = Date.now();
    const delay = new Date(currentTime - startTime).toUTCString().slice(17, 25);
    res.send(delay);
});

app.get('/api/events', events);

app.use((req, res) => {
    res.status(404);
    res.type('html');
    res.send('<h1>Page not found</h1>');
});

app.listen(8000, () => {
    startTime = Date.now();
    console.log('Example app listening on port 8000!');
});