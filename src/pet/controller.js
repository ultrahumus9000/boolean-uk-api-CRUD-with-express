// -- /pets/types that returns a list of pet types in the database
// -- /pets/a-pet-type that returns pets of a specific type ie. dog
// -- /pets/a-pet-type?breed=a-dog-breed that returns pets of a specific type and breed
// -- /pets?microchip=false that returns all pets without a microchip
// -- /pets/a-pet-type?microchip=false that returns pets of a specific type without a microchip

const pet = require("./model");

const { findType, findATypePets } = pet();

function getTypes(req, res) {
  let condition = req.query.microchip;

  findType(condition)
    .then((result) => {
      if (result || result.length > 0) {
        res.json(result);
      } else {
        res.status(500).json("not the right type request url");
      }
    })
    .catch(console.error);
}

function getOneType(req, res) {
  let type = req.params.petType;
  let condition = req.query.microchip;
  let breedAnimals = req.query.breed;

  findATypePets(type, condition, breedAnimals)
    .then((result) => {
      if (result || result.length > 0) {
        res.json(result);
      } else {
        res.status(500).json("not the right type request url");
      }
    })
    .catch(console.error);
}

module.exports = { getTypes, getOneType };
