const express = require("express");
const router = express.Router();

const MusicList = require("../models/MusicList");

router.post("/musicList", async (req, res) => {
  try {
    const newMusic = new MusicList({
      infos: req.body.infos,
    });
    await newMusic.save();
    res.status(201).json({
      message: "song added !",
      music: newMusic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error serveur", error });
  }
});

module.exports = router;
