const DishesRepository = require("../repositories/DishesRepository");
const DishesServices = require("../services/DishesServices");

class DishesController {
  async create(request, response) {
    const { name, category, description, price, ingredients } = request.body;

    const dishesRepository = new DishesRepository();
    const dishesServices = new DishesServices(dishesRepository);

    const dish_id = await dishesServices.create({
      name,
      category,
      description,
      price,
      ingredients,
    });

    return response.status(201).json(dish_id);
  }

  async show(request, response) {
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    const dishesServices = new DishesServices(dishesRepository);

    const dish = await dishesServices.show(id);

    return response.status(201).json(dish);
  }

  async index(request, response) {
    const { userQuery } = request.query;

    const dishesRepository = new DishesRepository();
    const dishesServices = new DishesServices(dishesRepository);
    const dishes = await dishesServices.index(userQuery);

    return response.status(201).json(dishes);
  }

  async update(request, response) {
    const { name, category, description, price, ingredients } = request.body;
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    const dishesServices = new DishesServices(dishesRepository);

    await dishesServices.update({
      id,
      name,
      category,
      description,
      price,
      ingredients,
    });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    const dishesServices = new DishesServices(dishesRepository);
    await dishesServices.delete(id);

    return response.status(201).json();
  }

  async imageUpload(request, response) {
    const { dishId } = request.params;
    const photoFilename = request.file.filename;

    const dishesRepository = new DishesRepository();
    const dishesServices = new DishesServices(dishesRepository);

    await dishesServices.upload(dishId, photoFilename);

    return response.status(201).json();
  }
}

module.exports = DishesController;
