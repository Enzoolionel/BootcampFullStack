import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
