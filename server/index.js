const express = require('express');
const cors = require('cors');
const path = require('path');
// const queries = require('../database/index.js');
const morgan = require('morgan')('dev');
const PORT = 8000;
const app = express();

app.use(morgan);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/setboard', (req, res) => {
  console.log('request to setboard: ', req.body);
  // should store the board in the database
  // should return a list of potential opponents to the client (or if there are none, tell the client to wait)
})

app.post('/creatematch', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});