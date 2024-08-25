import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Root Route setup
app.get('/', (req: Request, res: Response) => {
  res.json(`${new Date()}, welcome folk's🎉`);
});

module.exports = app;
