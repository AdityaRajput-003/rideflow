const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");
const jwt = require("jsonwebtoken");

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

  try {
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

  } catch (error) {

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Mobile number already registered",
      });
    }

    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({
      message: "Mobile and password are required",
    });
  }

  try {
    const result = await pool.query(
      "SELECT id, name, mobile, password FROM users WHERE mobile = $1",
      [mobile.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid mobile number or password",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid mobile number or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        mobile: user.mobile,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`RideFlow Backend is Running on port ${PORT}`);
});