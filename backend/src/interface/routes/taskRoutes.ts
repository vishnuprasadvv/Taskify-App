import { Router } from "express";
import { createTaskController, deleteTaskController, getAllTasksController, updateTaskController } from "../controllers/taskController";
import { isAuthenticated } from "../middlewares/authMiddleware";


const router = Router();


router.post('/create', isAuthenticated, createTaskController)
router.patch('/update/:id', updateTaskController)
router.delete('/delete/:id', deleteTaskController)
router.get('/', getAllTasksController)



export default router;