const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("../config");
const app = express();

//Configure Mongoose
console.log(config.db.url);
mongoose.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected to the db");
});

mongoose.set("useCreateIndex", true);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./routes")(app);

app.listen(config.port);
console.log("All set on port", config.port);
