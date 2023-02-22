import { articleCreate,
  articleFindAll,
  articleFindOne,
  articleUpdate,
  articleDelete,
  articleDeleteAll, } from "../controllers/articleController";
import express from "express";

const router = express.Router();

  // Create a new Tutorial
  router.post("/", articleCreate);

  // Retrieve all Tutorials
  router.get("/", articleFindAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", articleFindOne);

  // Update a Tutorial with id
  router.put("/:id", articleUpdate);

  // Delete a Tutorial with id
  router.delete("/:id", articleDelete);

  // Delete all Tutorials
  router.delete("/", articleDeleteAll);

export default router;
