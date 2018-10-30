import { Application, Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const { events } = require('./events.js');
const app: Application = express();
let startTime: number | null = null;
app.use(cors());
app.get('/status', (req: Request, res: Response) => {
  const currentTime: number = Date.now();
  if (startTime) {
    const delay = new Date(currentTime - startTime).toUTCString().slice(17, 25);
    res.send(delay);
  } else {
    throw new Error('startTime was not defined');
  }
});
app.get('/api/events', events);
app.use((req: Request, res: Response) => {
  res.status(404);
  res.type('html');
  res.send('<h1>Page not found</h1>');
});
app.listen(8000, () => {
  startTime = Date.now();
  console.log('Example app listening on port 8000!');
});
