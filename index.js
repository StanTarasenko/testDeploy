const express = require('express');
const path = require('path');
const pool = require('./db');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: "http://localhost:5000"
}));

app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos')
    res.json(todos.rows)
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname + "/public")));

app.listen(PORT);
