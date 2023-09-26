const UserRepository = require("../repositories/UserRepository");
const UserServices = require("../services/UserServices");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userServices = new UserServices(userRepository);

    await userServices.create({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userServices = new UserServices(userRepository);

    await userServices.update({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    return response.status(201).json();
  }

  async validate(request, response) {
    const { user } = request;

    const userRepository = new UserRepository();
    const userServices = new UserServices(userRepository);

    const userInfo = await userServices.validate(user.id);

    return response.status(201).json(userInfo);
  }
}

module.exports = UserController;
