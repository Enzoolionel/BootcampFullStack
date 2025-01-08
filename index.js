import express from "express";
import cors from "cors";

import { randomUUID } from "crypto";

let notes = [
  {
    id: 1,
    content: "HTML",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  console.log();
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === Number(id)); // Number(id) esto convierte el parametro id a numero
  console.log(note);

  if (note) {
    res.json(note);
  } else {
    res.status(404).send("<h1>URL not found</h1>");
  }
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  console.log(note);

  if (!note.content) {
    return res.status(400).json({
      error: "content is missing",
    });
  }

  const newNote = {
    id: randomUUID(),
    content: note.content,
    important: Boolean(note.important) || false, //Boolean() convierte el valor a booleano cualquier valor que no sea false, 0, "", null, undefined, NaN se convierte a true
  };

  notes = [...notes, newNote];

  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== Number(id));

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
