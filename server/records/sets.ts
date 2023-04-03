import { ISetWithWords, IWords } from "../types";
import { ValidationError } from "../errors/error";
import { WordSet } from "../database/models/wordsets";

interface Word {
  word: string;
  meaning: string;
  _id?: string;
}

interface Set {
  __v?: number;
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  words: Word[];
}

export class SetRecord implements ISetWithWords {
  public _id?: string;
  public description: string;
  public name: string;
  public createdAt: Date;
  public words: IWords[];

  constructor(obj: Set) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError("Name cannot be empty or longer than 100.");
    }

    if (obj.description) {
      if (obj.description.length > 1000) {
        throw new ValidationError("Description cannot be longer than 1000.");
      }
    }

    if (obj.words.length === 0) {
      throw new ValidationError("your ser of words cannot be empty!");
    }
    this._id = obj._id;
    this.name = obj.name;
    this.description = !obj.description ? null : obj.description;
    this.createdAt = obj.createdAt;
    this.words = obj.words;
  }

  static async findOne(id: string): Promise<SetRecord | null> {
    try {
      const result = await WordSet.findById(`${id}`);
      return new SetRecord(result.toObject());
    } catch (e) {
      return null;
    }
  }

  static async findAll(name?: string): Promise<SetRecord[] | null> {
    try {
      const result = await WordSet.find(
        name ? { name: { $regex: name, $options: "i" } } : {}
      );
      return result.map((set) => new SetRecord(set.toObject()));
      // if (!name) {
      //   const result = await WordSet.find();
      //   return result.map((set) => new SetRecord(set.toObject()));
      // } else {
      //   const result = await WordSet.find();
      //   return result.map((set) => new SetRecord(set.toObject()));
      // }
    } catch (e) {
      return null;
    }
  }

  static async findByName(name: string): Promise<SetRecord | null> {
    try {
      const result = await WordSet.findOne({ name: name });
      return result ? new SetRecord(result.toObject()) : null;
    } catch (e) {
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    if (!(await SetRecord.findOne(id))) {
      throw new ValidationError("A set with this id does not exist.");
    }
    try {
      const result = await WordSet.deleteOne({ _id: id });
      return result.deletedCount !== 0;
    } catch (e) {
      return false;
    }
  }

  async insert(): Promise<SetRecord | null> {
    const existingSet = await SetRecord.findByName(this.name);
    if (this._id || existingSet) {
      throw new ValidationError("A set with this name or ID already exists");
    }
    try {
      const set = await WordSet.create(this);
      // const result = await set.save();
      return new SetRecord(set.toObject());
    } catch (e) {
      return null;
    }
  }

  async update(): Promise<SetRecord | null> {
    if (!this._id) {
      throw new ValidationError("Set ID is required for updating.");
    }
    const existingSet = await SetRecord.findOne(this._id);
    if (!existingSet) {
      throw new ValidationError("A set with this id do not exist.");
    }
    const result = await WordSet.updateOne({ _id: this._id }, { $set: this });

    if (result.modifiedCount === 0) {
      throw new ValidationError("No set was updated.");
    }
    return this;
  }
}
