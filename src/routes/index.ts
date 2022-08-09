import { Router } from "express";
import * as loginController from "../controllers/loginController";
import verifyToken from "../middlewares/auth";
import userRoutes from "./userRoutes";

import multer from "multer";
import * as userController from "../controllers/userController";

const multi = multer();
const router = Router();

router.post("/login", loginController.login);
router.post("/register", multi.single("document"), userController.createUser);
router.use(verifyToken);

router.use("/users", userRoutes);

export default router;
