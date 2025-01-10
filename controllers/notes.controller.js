import { Note } from "../models/note.model.js";

// app.get("/api/notes",
// app.get("/api/notes/:id",
// app.post("/api/notes",
// app.delete("/api/notes/:id",

export const getAllNotes = (req, res) => {
  // Busca todas las notas en la base de datos y las envía como respuesta
  Note.find({}).then((result) => {
    res.send(result);
  });
};

export const getNoteId = (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud

  // Busca una nota por su ID en la base de datos
  Note.findById(id).then((note) => {
    console.log(note);
    if (!note) {
      // Si no se encuentra la nota, responde con un error 404
      res.status(404).json({
        message: "Note not found",
      });
    }
    // Si se encuentra la nota, la envía como respuesta en formato JSON
    res.json(note);
  });
};

export const addNote = (req, res) => {
  const note = req.body; // Obtiene el contenido de la nota del cuerpo de la solicitud
  console.log(note);

  if (!note.content) {
    // Si el contenido de la nota está vacío, responde con un error 400
    return res.status(400).json({
      error: "content is missing",
    });
  }

  // Crea una nueva instancia de la nota con el contenido y la importancia
  const newNote = new Note({
    content: note.content,
    important: Boolean(note.important) || false, // Convierte el valor a booleano
  });

  // Guarda la nueva nota en la base de datos y la envía como respuesta en formato JSON
  newNote.save().then((noteSaved) => {
    res.json(noteSaved);
  });
};

export const deleteNote = (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud

  if (!id) {
    // Si no se proporciona un ID, responde con un error 400
    return res.status(400).json({
      error: "id is missing",
    });
  }

  Note.findByIdAndDelete(id).then((result) => {
    // Si no se encuentra la nota, responde con un error 404
    if (!result) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
  });

  // Responde con un estado 204 (sin contenido) para indicar que la eliminación fue exitosa
  res.status(204).end();
};
