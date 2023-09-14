const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email });
    return user;
  }

  async create({ name, email, password }) {
    const userId = await knex("users").insert({ name, email, password });
    return { id: userId };
  }

  async findById(user_id) {
    const user = await knex("users").where({ id: user_id });
    return user;
  }

  async update(userInfo) {
    const update = await knex("users")
      .update(userInfo)
      .where({ id: userInfo.id });
    return update;
  }
}

module.exports = UserRepository;
