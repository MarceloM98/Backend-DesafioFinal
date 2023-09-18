const AppError = require("../utils/AppError");

class DishesServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async create({ name, category, description, price, ingredients }) {
    if (!name || !category || !description || !price || !ingredients) {
      throw new AppError("Todas as informações devem ser fornecidas.");
    }

    const confirm = await this.dishesRepository.create({
      name,
      category,
      description,
      price,
      ingredients,
    });

    if (!confirm) {
      throw new AppError("Erro ao cadastrar prato", 500);
    }
    return;
  }

  async index(userQuery) {
    const dishes = await this.dishesRepository.index(userQuery);
    return dishes;
  }

  async show(id) {
    if (!id) {
      throw new AppError("Erro ao acessar prato", 500);
    }

    const dish = await this.dishesRepository.show(id);

    if (!dish) {
      throw new AppError("Prato não encontrado!", 500);
    }

    return dish;
  }

  async delete(id) {
    if (!id) {
      throw new AppError("Erro ao receber id", 500);
    }
    const confirm = await this.dishesRepository.delete(id);

    if (!confirm) {
      throw new AppError("Falha ao deletar prato", 500);
    }
  }

  async update({ id, name, category, description, price, ingredients }) {
    const dish = await this.dishesRepository.show(id);

    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;
    dish.ingredients = ingredients ?? dish.ingredients;

    const confirmDishUpdate = await this.dishesRepository.updateDish(dish);

    if (!confirmDishUpdate) {
      throw new AppError("Erro ao atualizar prato.", 500);
    }
  }
}

module.exports = DishesServices;
