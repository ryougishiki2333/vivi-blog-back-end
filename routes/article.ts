import { articleCreate,
  articleFindAll,
  articleFindOne,
  articleUpdate,
  articleDelete,
  articleDeleteAll, } from "../controllers/articleController";
import express from "express";

const router = express.Router();

  // Create a new article
  router.post("/", articleCreate);

  // Retrieve all articles
  router.get("/", articleFindAll);

  // Retrieve a single article with id
  router.get("/:id", articleFindOne);

  // Update a article with id
  router.put("/", articleUpdate);

  // Delete a article with id
  router.delete("/:id", articleDelete);

  // Delete all articles
  router.delete("/", articleDeleteAll);

export default router;
