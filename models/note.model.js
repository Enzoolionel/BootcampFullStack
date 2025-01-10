import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url, { dbName: "noteApp" })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  date: String,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
    delete returnedObject.date;
  },
});

// const note = new Note({
//   content: "Java",
//   important: true,
//   date: new Date(),
// });

//! codigo para agregar notas a la base de datos
// note.save().then((result) => {
//   console.log("note saved!");
//   console.log(result);
//   mongoose.connection.close();
// });

export const Note = mongoose.model("Note", noteSchema);
