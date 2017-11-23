import { Router } from "express";

// FIXME: This should actually be a database call, not reading in a giant file
const json = require("./challenge-map-mock.json");

const router = Router();
const challenges = json.data.entities.challenge;

router.get("/challenge/:challenge", (req, res) => {
  const challenge = challenges[req.params.challenge];
  res.send(challenge);
});

export default router;
