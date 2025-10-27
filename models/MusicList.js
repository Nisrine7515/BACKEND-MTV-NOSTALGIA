const mongoose = require("mongoose");

const MusicList = mongoose.model("MusicList", {
  infos: {
    title: String,
    singer: String,
    year: Number,
    genre: String,
    // avatar: Object,
  },
});

module.exports = MusicList;
