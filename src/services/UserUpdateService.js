const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, old_password, user_id }) {
    const checkUserExists = await this.userRepository.findById(user_id);

    if (checkUserExists.length < 0) {
      throw new AppError("Usuário não encontrado.", 401);
    }

    const user = checkUserExists[0];

    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail.length > 0 && checkEmail[0].email === email) {
      throw new AppError("Este email já está em uso.", 401);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    const confirm = await this.userRepository.update(user);

    return confirm;
  }
}

module.exports = UserUpdateService;
