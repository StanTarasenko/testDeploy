const express = require('express');
const path = require('path');
const pool = require('./db');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

// app.use(cors());
let corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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
