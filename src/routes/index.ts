import { Router } from "express";
import userRoutes from "./userRoutes";
import * as loginController from "../controllers/loginController";
import verifyToken from "../middlewares/auth";

const router = Router();

router.post("/login", loginController.login);

router.use(verifyToken);

router.use("/users", userRoutes);

export default router;
