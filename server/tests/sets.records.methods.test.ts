import { SetRecord } from "../records/sets";

import mongoose from "mongoose";
import { connectDB } from "../database/connections/mainDatabase";
import { ValidationError } from "../errors/error";
import { WordSet } from "../database/models/wordsets";

let connection: mongoose.Connection;

beforeAll(async () => {
  connection = await connectDB();
  await WordSet.deleteMany({ name: { $regex: "Test", $options: "i" } });
});

afterAll(async () => {
  await connection.close();
});

afterEach(async () => {
  await WordSet.deleteMany({ name: { $regex: "Test", $options: "i" } });
});

const defaultSet = {
  name: "Test Set",
  description: "Test Set",
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
  const existingSet = new SetRecord({
    name: "Test Set",
    description: "A test set",
    createdAt: new Date(),
    words: [
      { word: "apple", meaning: "fruit" },
      { word: "banana", meaning: "fruit" },
    ],
  });
  await existingSet.insert();
  const newSet = new SetRecord({
    name: "Test Set",
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
  const set = new SetRecord(defaultSet);
  await set.insert();
  const sets = await SetRecord.findAll();
  expect(sets).toBeInstanceOf(Array);
  expect(sets[0]).toBeInstanceOf(SetRecord);
});

test("Finding all sets by searching '' - empty string - returns an array of SetRecord instances", async () => {
  const set = new SetRecord(defaultSet);
  await set.insert();
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

//.update()
test("Throws ValidationError if _id is not set", async () => {
  const set = new SetRecord({
    name: "Test Set",
    description: "A test set",
    createdAt: new Date(),
    words: [{ word: "apple", meaning: "fruit" }],
  });
  await expect(async () => await set.update()).rejects.toThrow(ValidationError);
});

test("Throws ValidationError if a set with the same name already exists and has a different _id", async () => {
  const set1 = new SetRecord(defaultSet);
  const set2 = new SetRecord(defaultSet);
  await set1.insert();

  set2._id = "123";
  await expect(set2.update()).rejects.toThrow(
    "A set with this id do not exist."
  );
});

test("Updates the set and returns a SetRecord instance", async () => {
  const setToInsert = new SetRecord(defaultSet);
  const set = await setToInsert.insert();
  console.log(set);
  set.name = "Updated Set Test Name";
  set.description = "Updated Test Set Description";
  set.words = [
    { word: "tree", meaning: "tree" },
    { word: "black", meaning: "black" },
  ];
  const updatedSet = await set.update();
  expect(updatedSet).toBeInstanceOf(SetRecord);
  expect(updatedSet._id).toEqual(set._id);
  expect(updatedSet.name).toEqual("Updated Set Test Name");
  expect(updatedSet.description).toEqual("Updated Test Set Description");
  expect(updatedSet.words).toEqual(set.words);
});

test("Throws an error if we trying to update set without id", async () => {
  const set = new SetRecord(defaultSet);
  set.name = "Updated Set Test Name";
  await expect(set.update()).rejects.toThrow(
    "Set ID is required for updating."
  );
});

test("Throws an error if no set was updated", async () => {
  const setToInsert = new SetRecord(defaultSet);
  const set = await setToInsert.insert();
  await expect(set.update()).rejects.toThrow("No set was updated.");
});
