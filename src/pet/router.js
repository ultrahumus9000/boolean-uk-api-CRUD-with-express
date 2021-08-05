const express = require("express");
const petRouter = express.Router();
const { getTypes, getOneType } = require("./controller");

petRouter.get("/types", getTypes);
petRouter.get("/:petType", getOneType);

module.exports = petRouter;

// -- /pets/types that returns a list of pet types in the database
// -- /pets/a-pet-type that returns pets of a specific type ie. dog
// -- /pets/a-pet-type?breed=a-dog-breed that returns pets of a specific type and breed
// -- /pets?microchip=false that returns all pets without a microchip
// -- /pets/a-pet-type?microchip=false that returns pets of a specific type without a microchip
