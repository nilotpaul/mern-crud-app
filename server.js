const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./lib/db");

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get route
app.use("/api/entries", require("./routes/entriesRoutes"));

// post route
app.use("/api/entries", require("./routes/entriesRoutes"));

// delete & put route
app.use("/api/entries/:id", require("./routes/entriesRoutes"));

app.listen(port, () => console.log(`server is running on port ${port}`));
