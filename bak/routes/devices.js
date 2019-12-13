var express = require("express");
var router = express.Router();
const settings = {
  host: "10.10.0.3",
  user: "fhemuser",
  password: "fhempassword",
  database: "fhem"
};
const QueryBuilder = require("node-querybuilder");
const qb = new QueryBuilder(settings, "mysql", "single");
const moment = require("moment");

router.get("/", function(req, res, next) {
  qb.distinct()
    .select("device")
    .get("history", (err, response) => {
      console.log("Query Ran: " + qb.last_query());
      if (err) throw err;
      res.send(JSON.stringify(response));
    });
});

module.exports = router;
