var express = require('express');
var faker = require("faker");
var router = express.Router();

router.get("/seed", function(req, res, next) {
  const db = req.app.get('db');
  db.schema.hasTable("users").then(function(exists) {
    if (!exists) {
      db.schema
        .createTable("users", function(table) {
          table.increments("id").primary();
          table.string("name");
          table.string("email");
        })
        .then(function() {
          const recordsLength = Array.from(Array(100).keys());
          const records = recordsLength.map(rec => ({
            name: faker.name.findName(),
            email: faker.internet.email()
          }));
          db("users")
            .insert(records)
            .then(() => {
              res.send("Seeded data");
            });
        });
    } else {
      res.send("Table exists - Seeded data");
    }
  });
});

router.route('/').get(function(req, res, next) {
  res.send({ true: true })
})


module.exports = router;
