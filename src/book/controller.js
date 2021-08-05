const book = require("./model");

const { findTypeOfBooks, findAuthorBooks } = book();

function getTypeBooks(req, res) {
  let bookType = req.params.id;
  let aTopic = req.query.topic;
  findTypeOfBooks(bookType, aTopic)
    .then((books) => {
      if (!books) {
        res.json("no books avaliable");
      } else {
        res.json(books);
      }
    })
    .catch((error) => res.status(500).json("datebase error"));
}

function getAuthorBooks(req, res) {
  let author = req.params.id;
  let orderDate = req.query.order;

  findAuthorBooks(author, orderDate).then((result) => {
    if (!result || result.length === 0) {
      res.json("no such author");
    } else {
      res.json(result);
    }
  });
}

module.exports = { getTypeBooks, getAuthorBooks };
