const SessionsRepository = require("../repositories/SessionsRepository");
const SessionsServices = require("../services/SessionsServices");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionsRepository = new SessionsRepository();
    const sessionsServices = new SessionsServices(sessionsRepository);

    const session = await sessionsServices.execute({
      email,
      password,
    });

    const user = session.user;

    response.cookie("token", session.token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    delete user.password;

    return response.status(201).json({ user });
  }
}

module.exports = SessionsController;
