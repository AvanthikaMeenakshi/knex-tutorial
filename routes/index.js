const express = require('express');
const faker = require("faker");
const router = express.Router();
const UsersService = require("../module/usersService.js");

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

router.route('/')
  .get(function(req, res, next) {
    const db = req.app.get("db");
    UsersService.getAllUsers(db).then(data => {
      res.send(data);
    });
  })
  .post(function(req, res) {
    const db = req.app.get("db");
    UsersService.insertUser(db, req.body).then(data => {
      res.send(data);
    });
  });
  .patch(function(req, res) {
    const db = req.app.get("db");
    UsersService.updateUser(db, req.params.id, req.body).then(() => {
      res.status(204).end();
    });
  })
  .delete(function(req, res) {
    const db = req.app.get("db");
    UsersService.deleteUser(db, req.params.id).then(data => {
      res.status(204).end();
    });
  });


module.exports = router;
