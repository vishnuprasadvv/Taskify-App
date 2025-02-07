import { Router } from "express";
import { createTaskController, deleteTaskController, getAllTasksController, getChartDataController, getTasksByUserController, getUsersController, updateTaskController } from "../controllers/taskController";
import { isAdminAuthenticated} from "../middlewares/authMiddleware";


const router = Router();


router.post('/create', isAdminAuthenticated, createTaskController)
router.patch('/update/:id', isAdminAuthenticated,updateTaskController)
router.delete('/delete/:id',isAdminAuthenticated, deleteTaskController)
router.get('/user', isAdminAuthenticated, getTasksByUserController)
router.get('/all',isAdminAuthenticated, getAllTasksController)
router.get('/users',isAdminAuthenticated, getUsersController)
router.get('/chart-data', isAdminAuthenticated, getChartDataController)



export default router;