const express = require("express");
const { getTypeBooks, getAuthorBooks } = require("./controller");
const bookRouter = express.Router();

bookRouter.get("/", (req, response) => {
  response.status(400).json("bad request");
});
bookRouter.get("/:id", getTypeBooks);
bookRouter.get("/author/:id", getAuthorBooks);

module.exports = bookRouter;
