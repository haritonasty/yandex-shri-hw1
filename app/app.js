const express = require('express');
const app = express();

app.get('/status', (req, res) => {
    const currentTime = Date.now();
    const delay = new Date(currentTime - startTime).toUTCString().slice(17, 25);
    res.send(delay);
});

let startTime = null;

app.listen(8000, () => {
    startTime = Date.now();
    console.log('Example app listening on port 8000!');
});