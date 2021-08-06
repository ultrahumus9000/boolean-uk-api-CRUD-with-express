const book = require("./model");

const {
  findTypeOfBooks,
  findAuthorBooks,
  findTypeBooksWithTopics,
  findAuthorBooksByOrder,
} = book();

function getTypeBooks(req, res) {
  let bookType = req.params.id;
  let aTopic = req.query.topic;
  bookType = bookType.charAt(0).toUpperCase() + bookType.slice(1);

  if (bookType === "Non-fiction") {
    bookType =
      bookType.slice(0, 4) +
      bookType.charAt(4).toUpperCase() +
      bookType.slice(5);
  }

  if (aTopic === undefined) {
    findTypeOfBooks(bookType)
      .then((books) => {
        if (books.length === 0) {
          throw "no such type of books avaliable";
        } else {
          res.json(books);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else {
    findTypeBooksWithTopics(bookType, aTopic)
      .then((books) => {
        if (books.length === 0) {
          throw "no such topic";
        } else {
          res.json(books);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
}

function getAuthorBooks(req, res) {
  let author = req.params.id;
  let orderDate = req.query.order;

  if (orderDate) {
    findAuthorBooksByOrder(author)
      .then((result) => {
        if (!result || result.length === 0) {
          throw "no such author";
        } else {
          res.json(result);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else {
    findAuthorBooks(author)
      .then((result) => {
        if (!result || result.length === 0) {
          throw "no such author";
        } else {
          res.json(result);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
}

module.exports = { getTypeBooks, getAuthorBooks };
