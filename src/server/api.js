import { Router } from "express";

// FIXME: This should actually be a database call, not reading in a giant file
const json = require("./challenge-map-mock.json");

const router = Router();
const challenges = json.data.entities.challenge;

router.get("/challenge/:challenge", (req, res) => {
  const challenge = challenges[req.params.challenge];
  const newTests = challenge.tests.map(test => {
    if (typeof test !== "string") {
      return test;
    }
    // Get the text between 'message:  and '
    const text = test.split("'message: ")[1].split("'")[0];
    return { testString: test, text };
  });
  res.send({ ...challenge, tests: newTests });
});

export default router;
