import {  tagCreate ,
  tagFindAll, } from "../controllers/tagController";
import express from "express";

const router = express.Router();

  // Create a new Tutorial
  router.post("/", tagCreate);

  // Retrieve all Tutorials
  router.get("/", tagFindAll);

//   // Retrieve all published Tutorials
//   router.get("/published", findAllPublished);

//   // Retrieve a single Tutorial with id
//   router.get("/:id", findOne);

//   // Update a Tutorial with id
//   router.put("/:id", update);

//   // Delete a Tutorial with id
//   router.delete("/:id", deleteT);

//   // Delete all Tutorials
//   router.delete("/", deleteAll);

export default router;  
