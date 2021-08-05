const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connection = process.env.linlinURL;

const db = new Client(connection);

module.export = db;
