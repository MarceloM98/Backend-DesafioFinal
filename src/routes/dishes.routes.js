const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  dishesController.create
);
dishesRoutes.patch(
  "/photo/:dishId",
  verifyUserAuthorization(["admin"]),
  upload.single("photo"),
  dishesController.imageUpload
);
dishesRoutes.patch(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishesController.update
);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishesController.delete
);

module.exports = dishesRoutes;
