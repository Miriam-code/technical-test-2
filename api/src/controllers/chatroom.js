const express = require("express");
const passport = require("passport");
const router = express.Router();

const ChatroomObject = require("../models/chatroom");

const SERVER_ERROR = "SERVER_ERROR";
const CHATROOM_ALREADY_EXISTS = "CHATROOM_ALREADY_EXISTS";

// CREATE CHATROOM

router.post("/", passport.authenticate("user", { session: false }), async (req, res) => {
    try {
        const { name } = req.body;
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(name)) {
            throw "Chatroom name can contain only alphabets.";
        }

        const chatroomExists = await ChatroomObject.findOne({ name });

        if (chatroomExists) {
            throw "Chatroom with that name already exists!";
        }

        const chatroom = new ChatroomObject({ name });
        await chatroom.save();

        return res.status(200).send({ ok: true, message: "Chatroom created!" });
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).send({ ok: false, code: CHATROOM_ALREADY_EXISTS });
        }

        return res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }
});

// GET ALL CHATROOM

router.get("/",passport.authenticate("user", { session: false }), async (req, res) => {

    try {

        const chatrooms = await ChatroomObject.find({});
       
       return res.status(200).send({ ok: true, chatrooms});

    } catch (error) {
      console.log(error);
      res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }

});

// GET ONE CHATROOM

router.get("/:id",passport.authenticate("user", { session: false }), async (req, res) => {

    try {
        const data = await ChatroomObject.findOne({ _id: req.params.id });
        return res.status(200).send({ ok: true, data });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: SERVER_ERROR, error });
      }
});




module.exports = router;
