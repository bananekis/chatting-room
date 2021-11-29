const express = require('express');
const cors = require('cors');

// routes

const authRoutes = require("./routes/auth.js");

// ENV config

require("dotenv").config();

// instance of express application

const app = express();
const PORT = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// routes

app.get('/', (_,res) => {
	res.send("Live, working!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
