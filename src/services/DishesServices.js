const AppError = require("../utils/AppError");

class DishesCreateService {
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
}

module.exports = DishesCreateService;
