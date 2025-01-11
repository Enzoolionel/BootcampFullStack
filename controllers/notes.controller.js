import { Note } from "../models/note.model.js";

export const getAllNotes = (req, res) => {
  // Busca todas las notas en la base de datos y las envía como respuesta
  Note.find({}).then((result) => {
    res.send(result);
  });
};

export const getNoteId = (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud

  // Busca una nota por su ID en la base de datos
  Note.findById(id)
    .then((note) => {
      console.log(note);
      if (!note) {
        // Si no se encuentra la nota, responde con un error 404
        res.status(404).json({
          message: "Note not found",
        });
      }
      // Si se encuentra la nota, la envía como respuesta en formato JSON
      res.json(note);
    })
    .catch((err) => {
      res.status(500).end();
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
  Note.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        // Si no se encuentra la nota, responder con un 404
        return res.status(404).json({
          error: "Note not found",
        });
      }
      res.status(204).end(); // Nota eliminada con éxito
    })
    .catch((error) => {
      console.error("Error deleting the note:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
