const db = require("../database/database");

function Book() {
  async function findTypeOfBooks(type, topic) {
    const typeSQL = `SELECT * FROM books WHERE type = $1`;
    const topicSQL = `SELECT * FROM books WHERE type = $1 AND topic = $2`;
    try {
      if (type === "fiction") {
        if (topic === undefined) {
          let result = await db.query(typeSQL, [`Fiction`]);
          return result.rows;
        } else {
          let result = await db.query(topicSQL, [`Fiction`, topic]);
          if (result.rows.length === 1) {
            return result.rows[0];
          }
          return result.rows;
        }
      } else if (type === "non-fiction") {
        if (topic === undefined) {
          let result = await db.query(typeSQL, [`Non-Fiction`]);
          return result.rows;
        } else {
          let result = await db.query(topicSQL, [`Non-Fiction`, topic]);
          if (result.rows.length === 1) {
            return result.rows[0];
          }
          return result.rows;
        }
      }
    } catch (error) {
      console.log("database error");
    }
  }
  async function findAuthorBooks(author, order) {
    const authorSQL = `SELECT * FROM books WHERE author= $1`;
    const bookByOrderSql = `SELECT * FROM books WHERE author= $1 ORDER BY publicationdate DESC `;

    if (order) {
      let result = await db.query(bookByOrderSql, [author]);
      return result.rows;
    }
    let result = await db.query(authorSQL, [author]);
    return result.rows;
  }
  return {
    findTypeOfBooks,
    findAuthorBooks,
  };
}

module.exports = Book;

// -- /books/fiction that returns fiction books
// -- /books/fiction?topic=a-topic that returns a specific topic of fiction books
// -- /books/non-fiction that return non-fiction books
// -- /books/non-fiction?topic=a-topic that returns a specific topic of non-fiction books
// -- /books/author/name-of-author?order=recent that returns a specific authors' books ordered by publicationDate with the most recent first (use ORDER in your SQL query)
