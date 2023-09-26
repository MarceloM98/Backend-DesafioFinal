const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async create({ name, category, description, price, ingredients }) {
    if (!name || !category || !description || !price || !ingredients) {
      throw new AppError("Todas as informações devem ser fornecidas.");
    }

    const dish_id = await this.dishesRepository.create({
      name,
      category,
      description,
      price,
      ingredients,
    });

    if (!dish_id) {
      throw new AppError("Erro ao cadastrar prato", 500);
    }
    return dish_id;
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

  async upload(dishId, file) {
    const diskStorage = new DiskStorage();
    const dish = await this.dishesRepository.show(dishId);

    if (!dish) {
      throw new AppError("Prato não encontrado", 401);
    }

    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    }

    const filename = await diskStorage.saveFile(file);

    dish.photo = filename;
    delete dish.ingredients;
    const upload = await this.dishesRepository.uploadImage(dish);

    if (!upload) {
      throw new AppError("Erro ao salvar imagem", 500);
    }
    return;
  }
}

module.exports = DishesServices;
