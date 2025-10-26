require("dotenv").config();

express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const User = require("./models/User");

app.get("/", (req, res) => {
  try {
    return res.statue(200).json("Welcome to MTV NOSTALGIA");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

// app.post("/create-music-list", (req, res) => {
//   const musicList = [];
//   const newMusic = req.body.name;
//   musicList.push(newMusic);
//   res.json(newMusic);
// });

app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur has stated ${PORT}`);
});
