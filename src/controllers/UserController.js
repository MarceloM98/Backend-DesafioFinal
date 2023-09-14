const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserUpdateService = require("../services/UserUpdateService");
const AppError = require("../utils/AppError");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = 1;
    // const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);

    const confirm = await userUpdateService.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    if (!confirm) {
      throw new AppError("Erro ao salvar", 500);
    }

    return response.status(201).json();
  }
}

module.exports = UserController;
