export interface IWords {
  word: string;
  meaning: string;
  _id?: string;
}

export interface ISetWithWords {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  words: IWords[];
}

export interface SetEntity {
  _id?: string;
  name: string;
  description: string;
}
