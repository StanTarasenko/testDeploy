const express = require('express');
const path = require('path');
const pool = require('./db');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

app.use(cors());

var corsOptions = {
  origin: 'https://sampletest-d0be9f7bd455.herokuapp.com/',
  optionsSuccessStatus: 200
}

app.get('/todos', cors(corsOptions), async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos')
    res.json(todos.rows)
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname + "/public")));

app.listen(PORT);
