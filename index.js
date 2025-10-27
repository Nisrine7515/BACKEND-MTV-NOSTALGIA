import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const fs = require("fs");

require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// const User = require("./models/User");
// const MusicList = require("./models/MusicList");

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome to MTV NOSTALGIA");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

const musicListRoutes = require("./routes/musicList");
app.use(musicListRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur has stated ${PORT}`);
});
