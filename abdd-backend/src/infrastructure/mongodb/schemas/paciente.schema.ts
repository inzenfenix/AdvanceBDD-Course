import { Schema } from 'mongoose';

export const PacienteSchema = new Schema({
  _id: String,
  nombre: String,
  tutor: String,
  raza: String,
  especie: String,
  edad: Number,
  genero: String,
});
