const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

module.exports = router;

//Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch {
    res.status(500).json({ message: "wow" });
  }
});

// Getting one
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

//creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating one
router.patch("/:id", getSubscriber, (req, res) => {
  // if()
});

// deleting one
router.delete("/:id", async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted him" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(rew, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null)
      return res.status(400).json({ message: "Cannot find subscriber" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}
