const db = require("../database/database");

function Pet() {
  async function findType(condition) {
    const typeSQL = `SELECT type FROM pets`;
    const conditionSQL = `SELECT * FROM pets WHERE microchip = $1`;

    try {
      if (condition) {
        const result = await db.query(conditionSQL, [JSON.parse(condition)]);
        return result.rows;
      } else {
        const result = await db.query(typeSQL);
        return result.rows;
      }
    } catch (error) {
      return "database query error";
    }
  }

  async function findATypePets(type, condition, breed) {
    const typeSQL = `SELECT * FROM pets WHERE type = $1`;
    const conditionSQL = `SELECT * FROM pets WHERE type = $1 AND microchip = $2`;
    const breedSQL = `SELECT * FROM pets WHERE type = $1 AND breed = $2`;

    try {
      if (condition) {
        const result = await db.query(conditionSQL, [
          type,
          JSON.parse(condition),
        ]);
        return result.rows;
      } else if (breed) {
        const result = await db.query(breedSQL, [type, breed]);
        return result.rows;
      } else {
        const result = await db.query(typeSQL, [type]);
        return result.rows;
      }
    } catch (error) {
      return "database query error";
    }
  }

  return { findType, findATypePets };
}

module.exports = Pet;

// -- /pets/types that returns a list of pet types in the database
// -- /pets/a-pet-type that returns pets of a specific type ie. dog
// -- /pets/a-pet-type?breed=a-dog-breed that returns pets of a specific type and breed
// -- /pets?microchip=false that returns all pets without a microchip
// -- /pets/a-pet-type?microchip=false that returns pets of a specific type without a microchip
