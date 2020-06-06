import express from "express";

import multer from "multer";
import multerConfig from "./config/multerConfig";

import { itemsController, pointsController } from "./controllers";

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", itemsController.index);

routes.post("/points", upload.single("image"), pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;
