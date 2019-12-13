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

router.get("/:device/:reading", function(req, res, next) {
  let device = req.params.device;
  let reading = req.params.reading;
  let from = req.query.from;
  let to = req.query.to;
  if (!to) {
    to = moment();
  } else {
    to = moment(to);
  }
  if (!from) {
    from = moment(to);
    from.subtract(1, "day");
  } else {
    from = moment(from);
  }
  console.log(to);
  qb.select("timestamp,value")
    .where({
      device: device,
      reading: reading,
      "timestamp >": from.format("YYYY-MM-DD HH:mm:ss"),
      "timestamp <": to.format("YYYY-MM-DD HH:mm:ss")
    })
    .get("history", (err, response) => {
      console.log("Query Ran: " + qb.last_query());
      if (err) throw err;
      res.send(JSON.stringify(response));
    });
});

module.exports = router;
