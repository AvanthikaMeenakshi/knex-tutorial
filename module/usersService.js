const UsersService = {
  getAllUsers(db) {
    return db.select("*").from("users");
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id) {
    return db.from("users").select("*").where("id", id).first();
  },
  deleteUser(db, id) {
    return db("users").where({ id }).delete();
  },
  updateUser(db, id, userFields) {
    return db("users").where({ id }).update(userFields);
  },
};

module.exports = UsersService;
