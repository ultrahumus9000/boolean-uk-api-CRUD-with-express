const db = require("../database/database");

function Pet() {
  function createTable() {}

  function createOnePet() {}

  function findAllPets() {}

  function findOnePet() {}

  function deleteOnePet() {}

  function updateOnePet() {}

  return {
    createOnePet,
    findAllPets,
    findOnePet,
    deleteOnePet,
    updateOnePet,
  };
}

module.exports = Pet;
