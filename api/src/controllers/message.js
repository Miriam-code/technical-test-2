const express = require("express");
const passport = require("passport");
const router = express.Router();

const MessageObject = require("../models/message");

const SERVER_ERROR = "SERVER_ERROR";

// GET ALL MESSAGE

router.get("/",passport.authenticate("user", { session: false }), async (req, res) => {

    try {
        
        const msg = await MessageObject.find({});
       
       return res.status(200).send({ ok: true, msg});

    } catch (error) {
      console.log(error);
      res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }

});

// GET ONE MESSAGE

router.get("/:id", passport.authenticate("user", { session: false }), async (req, res) => {
  try {
    const msg = await MessageObject.find({ chatroom: req.params.id }).populate('user');
    return res.status(200).send({ ok: true, msg});
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
});





module.exports = router;
