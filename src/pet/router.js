const express = require("express");
const petRouter = express.Router();

petRouter.get("/types", () => {});
petRouter.get("/:petType", () => {});

module.exports = petRouter;
