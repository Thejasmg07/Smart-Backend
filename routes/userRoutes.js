import express from "express";
import { authUser, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.post("/auth", authUser);
router.get("/:id", getUserById);

export default router;
