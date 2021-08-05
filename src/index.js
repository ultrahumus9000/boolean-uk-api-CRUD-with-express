const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.listen("4000", () => {
  //   console.log("i am here");
});
