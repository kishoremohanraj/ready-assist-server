const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");

router.get("/", async (req, res) => {
  let limit = req.query.limit || 10;
  const users = await User.find().limit(limit);
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found!");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let user = new User(
    _.pick(req.body, ["username", "firstName", "lastName", "isActive"])
  );
  user
    .save()
    .then(() => {
      res.send(_.pick(user, ["_id", "username", "firstName", "lastName"]));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isActive: req.body.isActive,
    },
    { new: true }
  );

  if (!user) return res.status(404).send("User not found!");
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!user) return res.status(404).send("User not found!");
  res.status(200).send(user);
});

module.exports = router;
