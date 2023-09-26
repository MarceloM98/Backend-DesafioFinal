const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UserController = require("../controllers/UserController");

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.get("/validate", ensureAuthenticated, userController.validate);

module.exports = userRoutes;
