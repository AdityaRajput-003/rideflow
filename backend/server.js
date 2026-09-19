const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("RideFlow Backend is Running!!");
});

app.post("/api/auth/register", async (req, res) => {
  const { name, mobile, password } = req.body;

  if (!name || !mobile || !password) {
    return res.status(400).json({
      message: "Name, mobile and password are required",
    });
  }

  if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
    return res.status(400).json({
      message: "Enter a valid 10-digit mobile number",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, mobile, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, mobile, created_at`,
    [name.trim(), mobile.trim(), hashedPassword]
  );

  res.status(201).json({
    message: "Registration successful",
    user: result.rows[0],
  });
});
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully!");
    console.log("Database time:", result.rows[0].now);
  }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`RideFlow Backend is Running on http://localhost:${PORT}`)
});