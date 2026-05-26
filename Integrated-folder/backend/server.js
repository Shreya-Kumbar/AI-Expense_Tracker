const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("expenses.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount REAL,
      category TEXT
    )
  `);
});

app.get("/", (req, res) => {
  res.send("Expenses API is running 🚀");
});

app.post("/expenses", (req, res) => {
  const { title, amount, category } = req.body;

  db.run(
    "INSERT INTO expenses(title, amount, category) VALUES(?, ?, ?)",

    [title, amount, category],

    function (err) {
      if (err) return res.status(500).json(err);
      res.json({
        id: this.lastID,
        title,
        amount,
        category
     });
    }
  );
});

app.get("/expenses", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    res.json(rows);
  });
});

app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM expenses WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);

    res.json({ message: "Expense deleted" });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});