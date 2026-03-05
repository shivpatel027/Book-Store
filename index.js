const express = require('express');

const bookRouter = require('./routes/book.routes');

const { loggerMiddleware } = require('./middleware/logger');

const fs = require('fs');
const app = express();
const port = 3000;

app.use(loggerMiddleware); 

//Middleware to parse JSON bodies
app.use(express.json());

// app.use((req, res, next) => {  
//   const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
//   fs.appendFileSync('log.txt', log, 'utf-8');
//   console.log(log);
//   next();
// }); 

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Store!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});