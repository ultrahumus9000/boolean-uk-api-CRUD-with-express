const express = require("express");
const morgan = require("morgan");
const db = require("./database/database");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.listen("4000", () => {
  //   console.log("i am here");
  db.connect((error) => {
    if (error) {
      console.error("[ERROR] Connection error: ", error.stack);
    } else {
      console.log("\n[DB] Connected...\n");
    }
  });
});
