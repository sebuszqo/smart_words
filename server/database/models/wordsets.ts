import mongoose, { Schema, DateSchemaDefinition } from "mongoose";
import { ISetWithWords } from "../../types";

const setSchema: Schema = new Schema<ISetWithWords>({
  name: { type: String, required: true },
  createdAt: { type: Date },
  description: { type: String },
  words: [
    {
      word: String,
      meaning: String,
    },
  ],
});

export const WordSet = mongoose.model("WordsSet", setSchema);
