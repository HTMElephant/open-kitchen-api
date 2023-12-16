const express = require("express");
const massive = require("massive");
const cors = require("cors");

const routes = require("./routes");

require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("REQUEST", req.method, req.url);
  next();
});

app.use(routes);

app.get("/health-check", (req, res) => res.send("Healthy"));

app.use(async (err, req, res, next) => {
  console.log("ERROR HANDLER", req.url);
  console.error(err);

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

massive(CONNECTION_STRING).then((connection) => {
  app.set("db", connection);
  app.listen(4001, () => console.log("Express app started on port 4001"));
});
