import { create } from "../controllers/tutorialController";
import express from "express";

const router = express.Router();

// Create a new Tutorial
router.post("/", create);

export default router;
