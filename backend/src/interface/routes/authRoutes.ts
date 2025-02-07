import express from "express";
import { adminLoginController, adminLogoutController, loginController, logoutController, registerAdminController, registerController } from "../controllers/authController";

const router = express.Router();

router.post('/register', registerController)
router.post('/admin/register', registerAdminController)
router.post('/login', loginController)
router.post('/admin/login', adminLoginController)
router.post('/logout', logoutController)
router.post('/admin/logout', adminLogoutController)



export default router; 