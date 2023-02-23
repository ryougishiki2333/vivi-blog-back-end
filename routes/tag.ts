import {  tagCreate,
  tagFindAll,
  tagFindOne,
  tagUpdate,
  tagDelete,
  tagDeleteAll } from "../controllers/tagController";
import express from "express";

const router = express.Router();

  // Create a new tag
  router.post("/", tagCreate);

  // Retrieve all tags
  router.get("/", tagFindAll);

  // Retrieve a single tag with id
  router.get("/:id", tagFindOne);

  // Update a tag with id
  router.put("/:id", tagUpdate);

  // Delete a tag with id
  router.delete("/:id", tagDelete);

  // Delete all tags
  router.delete("/", tagDeleteAll);

export default router;  
