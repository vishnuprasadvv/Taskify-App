import { Router } from "express";
import { getTasksForUserController, updateTaskStatusController } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";


const router = Router();

router.get('/', isAuthenticated, getTasksForUserController)
router.patch('/edit/:id', isAuthenticated, updateTaskStatusController)


export default router;