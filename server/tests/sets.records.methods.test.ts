import { SetRecord } from "../records/sets";

import mongoose from "mongoose";
import { connectDB } from "../database/connections/mainDatabase";
import { ValidationError } from "../errors/error";
import { WordSet } from "../database/models/wordsets";

let connection: mongoose.Connection;

beforeAll(async () => {
  connection = await connectDB();
  await WordSet.deleteMany({ name: "Test Set" });
});

afterAll(async () => {
  await connection.close();
});

afterEach(async () => {
  await WordSet.deleteMany({ name: "Test Set" });
});

const defaultSet = {
  name: "Test Set",
  description: "A test set",
  createdAt: new Date(),
  words: [
    { word: "test", meaning: "A trial or experiment" },
    {
      word: "example",
      meaning:
        "A thing characteristic of its kind or illustrating a general rule.",
    },
  ],
};

test("Inserting a new set creates a SetRecord instance", async () => {
  const set = new SetRecord(defaultSet);
  await set.insert();
  expect(set).toBeInstanceOf(SetRecord);
});

test("Inserting a new set saves it to the database", async () => {
  const set = new SetRecord({
    name: "Test Set",
    description: "A test set",
    createdAt: new Date(),
    words: [
      { word: "apple", meaning: "fruit" },
      { word: "banana", meaning: "fruit" },
    ],
  });
  const insertedSet = await set.insert();
  const foundSet = await SetRecord.findOne(insertedSet._id);
  expect(foundSet).not.toBeNull();
  expect(foundSet.name).toBe("Test Set");
  expect(foundSet.description).toBe("A test set");
  expect(foundSet.words.length).toBe(2);
  expect(foundSet.words[0].word).toBe("apple");
  expect(foundSet.words[0].meaning).toBe("fruit");
});

test("Inserting a new set saves it to the database", async () => {
  const set = new SetRecord({
    name: "Test Set",
    description: "A test set",
    createdAt: new Date(),
    words: [
      { word: "apple", meaning: "fruit" },
      { word: "banana", meaning: "fruit" },
    ],
  });
  const insertedSet = await set.insert();
  await expect(async () => await insertedSet.insert()).rejects.toThrow(
    ValidationError
  );
});

test("Inserting a new set with the same name as an existing set throws a ValidationError", async () => {
  await WordSet.deleteMany({ name: "Existing Set" });
  const existingSet = new SetRecord({
    name: "Existing Set",
    description: "A test set",
    createdAt: new Date(),
    words: [
      { word: "apple", meaning: "fruit" },
      { word: "banana", meaning: "fruit" },
    ],
  });
  await existingSet.insert();
  const newSet = new SetRecord({
    name: "Existing Set",
    description: "A test set",
    createdAt: new Date(),
    words: [
      { word: "apple", meaning: "fruit" },
      { word: "banana", meaning: "fruit" },
    ],
  });
  await expect(async () => await newSet.insert()).rejects.toThrowError(
    ValidationError
  );
});

test("Finding all sets returns an array of SetRecord instances", async () => {
  const sets = await SetRecord.findAll();
  expect(sets).toBeInstanceOf(Array);
  expect(sets[0]).toBeInstanceOf(SetRecord);
});

test("Finding all sets by searching '' - empty string - returns an array of SetRecord instances", async () => {
  const sets = await SetRecord.findAll("");
  expect(sets).toBeInstanceOf(Array);
  expect(sets[0]).toBeInstanceOf(SetRecord);
});

test("Finding all sets with a name filter returns the correct sets", async () => {
  const set = new SetRecord(defaultSet);
  await set.insert();
  const sets = await SetRecord.findAll("Test");
  expect(sets).toBeInstanceOf(Array);
  expect(sets[0]).toBeInstanceOf(SetRecord);
  expect(sets[0].name).toBe("Test Set");
});

test("Finding all sets with a non-existent name filter returns an empty array", async () => {
  const sets = await SetRecord.findAll("Non-existent name");
  expect(sets).toBeInstanceOf(Array);
  expect(sets).toHaveLength(0);
});
