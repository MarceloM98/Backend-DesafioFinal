const knex = require("../database/knex");

class DishesRepository {
  async create({ name, category, description, price, ingredients }) {
    const [dish_id] = await knex("dishes").insert({
      photo: "teste",
      name,
      category,
      description,
      price,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id,
        name: ingredient,
      };
    });

    const confirmIngredients = await knex("ingredients").insert(
      ingredientsInsert
    );

    if (!dish_id || !confirmIngredients) {
      return false;
    }
    return true;
  }

  async show(id) {
    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id });
    return { ...dish, ingredients };
  }

  async index(userQuery) {
    const dishesQuery = await knex
      .select(
        "dishes.photo",
        "dishes.name",
        "dishes.category",
        "dishes.description",
        "dishes.price"
      )
      .from("dishes")
      .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
      .where("dishes.name", "LIKE", `%${userQuery}%`)
      .orWhere("ingredients.name", "LIKE", `%${userQuery}%`)
      .distinct("dishes.id");
    return dishesQuery;
  }

  async delete(id) {
    const confirm = await knex("dishes").where({ id }).limit(1).del();
    return confirm;
  }
}

module.exports = DishesRepository;
