const mongoose = require("mongoose");

const MODELNAME = "chatroom";

const Schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true ,
    required: "Name is required!",
  },
});

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;