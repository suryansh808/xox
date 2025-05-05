// routes/thoughtRoutes.js
const express = require("express");
const Thought = require("../models/Thoughts");
const router = express.Router();

// Create a new thought
router.post("/thoughts", async (req, res) => {
  try {
    const newThought = new Thought({
      text: req.body.text,
      replies: [],
    });

    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getthoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a reply to a thought
router.post("/thoughtsreplies/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: "Thought not found" });

    thought.replies.push({ text: req.body.text });
    await thought.save();
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Show and hide a thoughts
router.put("/changevisible/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    if (req.body.visible === "show") {
      thought.visible = req.body.visible;
    }
    if (req.body.visible === "hide") {
      thought.visible = req.body.visible;
    }
    await thought.save();
    res.status(200).json(thought);
    console.log("updated", thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Show and hide a reply
router.put("/changerepliesvisibilty/:thoughtId/replies/:replyIndex",async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought)
        return res.status(404).json({ message: "Thought not found" });

      const reply = thought.replies[req.params.replyIndex];
      if (!reply) return res.status(404).json({ message: "Reply not found" });

      if (req.body.visibilty === "show") {
        reply.visible = req.body.visibilty;
      }
      if (req.body.visibilty === "hide") {
        reply.visible = req.body.visibilty;
      }
      await thought.save();
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
