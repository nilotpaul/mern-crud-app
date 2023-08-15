const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./lib/db");

connectDB();

const port = process.env.PORT || 5000;

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5000"];
var corsOptions = {
  origin: function (origin, callback) {
    const origins = allowedOrigins.find((item) => {
      return item === origin;
    });
    if (!origin || origins) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  },
};

app.use(cors(process.env.NODE_ENV === "production" ? corsOptions : null));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get route
app.use("/api/entries", require("./routes/entriesRoutes"));

// post route
app.use("/api/entries", require("./routes/entriesRoutes"));

// delete & put route
app.use("/api/entries/:id", require("./routes/entriesRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Set to production");
  });
}

app.listen(port, () => console.log(`server is running on port ${port}`));
