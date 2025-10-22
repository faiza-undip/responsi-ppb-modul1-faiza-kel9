import express from "express";
import { ItemController } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getById);
router.post("/", ItemController.create);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.remove);

export default router;