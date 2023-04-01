// Want to save this code to be used later
// tested db connection
// async function run() {
//   try {
//     const set: ISetWithWords = {
//       createdAt: new Date(),
//       name: "test name",
//       description: "test description",
//       words: [
//         { word: "word1", meaning: "meaning1" },
//         { word: "word2", meaning: "meaning2" },
//       ],
//     };
//     const createdSet = await WordSet.create(set);
//     console.log(createdSet);
//     await createdSet.save();
//   } catch (e) {
//     console.log("Error occurred", e.message);
//   }
// }
// run();

import { ISetWithWords, IWords } from "../types";
import { ValidationError } from "../errors/error";
import { WordSet } from "../database/models/wordsets";
import { Document } from "mongoose";
interface Word {
  word: string;
  meaning: string;
  _id: string;
}

interface Set extends Document {
  __v: number;
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  words: Word[];
}

export class SetRecord implements ISetWithWords {
  public _id?: string;
  public description: string;
  public name: string;
  public createdAt: string;
  public words: IWords[];
  public __v: number;

  constructor(obj: Set) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError("Name cannot be empty or longer than 100.");
    }

    if (obj.description) {
      if (obj.description.length > 1000) {
        throw new ValidationError("Description cannot be longer than 1000.");
      }
    }
    if (!obj.words) {
      throw new ValidationError("your ser of words cannot be empty!");
    }
    this._id = obj._id;
    this.name = obj.name;
    this.description = !obj.description ? null : obj.description;
    this.createdAt = obj.createdAt;
    this.words = obj.words;
    this.__v = obj.__v;
  }

  static async findOne(id: string): Promise<SetRecord | null> {
    try {
      const result = await WordSet.findById(`${id}`);
      return new SetRecord(result.toObject());
    } catch (e) {
      return null;
    }
  }
  static async findAll(): Promise<SetRecord[] | null> {
    try {
      const result = await WordSet.find();
      return result.map((set) => new SetRecord(set.toObject()));
    } catch (e) {
      return null;
    }
  }
}
