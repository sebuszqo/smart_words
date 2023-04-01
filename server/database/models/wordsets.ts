import mongoose, { Schema, Document } from "mongoose";
import { ISetWithWords } from "../../types";

const setSchema: Schema = new Schema<ISetWithWords>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  words: [
    {
      word: String,
      meaning: String,
    },
  ],
});

export const WordSet = mongoose.model("WordsSet", setSchema);
