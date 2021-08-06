const db = require("../database/database");

function Book() {
  async function findTypeOfBooks(type, topic) {
    const typeSQL = `SELECT * FROM books WHERE type = $1`;

    try {
      let result = await db.query(typeSQL, [type]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async function findTypeBooksWithTopics(type, topic) {
    const topicSQL = `SELECT * FROM books WHERE type = $1 AND topic = $2`;
    try {
      let result = await db.query(topicSQL, [type, topic]);
      if (result.rows.length === 1) {
        return result.rows[0];
      }
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async function findAuthorBooks(author) {
    const authorSQL = `SELECT * FROM books WHERE author LIKE $1`;

    try {
      let result = await db.query(authorSQL, [`%${author}%`]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async function findAuthorBooksByOrder(author, order) {
    const bookByOrderSql = `SELECT * FROM books WHERE author LIKE $1 ORDER BY publicationdate DESC `;

    try {
      let result = await db.query(bookByOrderSql, [`%${author}%`]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  return {
    findTypeOfBooks,
    findAuthorBooks,
    findTypeBooksWithTopics,
    findAuthorBooksByOrder,
  };
}

module.exports = Book;

// -- /books/fiction that returns fiction books
// -- /books/fiction?topic=a-topic that returns a specific topic of fiction books
// -- /books/non-fiction that return non-fiction books
// -- /books/non-fiction?topic=a-topic that returns a specific topic of non-fiction books
// -- /books/author/name-of-author?order=recent that returns a specific authors' books ordered by publicationDate with the most recent first (use ORDER in your SQL query)
