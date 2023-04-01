export interface IWords {
  word: string;
  meaning: string;
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
