import { Router } from "express";
import {
  getAllNotes,
  getNoteId,
  addNote,
  deleteNote,
} from "../controllers/notes.controller.js";

const router = Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteId);

router.post("/", addNote);

router.delete("/:id", deleteNote);

export default router;
