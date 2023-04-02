import { SetRecord } from "../records/sets";

import mongoose from "mongoose";
import { connectDB } from "../database/connections/mainDatabase";
let connection: mongoose.Connection;

beforeAll(async () => {
  connection = await connectDB();
});

afterAll(async () => {
  await connection.close();
});

// test("Finding a set by ID returns the correct set", async () => {
//   const set = await SetRecord.findOne(defaultSet._id);
//   expect(set).toBeInstanceOf(SetRecord);
//   expect(set._id).toBe(defaultSet._id);
// });

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
  const sets = await SetRecord.findAll("Test");
  expect(sets).toBeInstanceOf(Array);
  expect(sets[0]).toBeInstanceOf(SetRecord);
  // expect(sets[0].name).toBe("Test Set");
});

test("Finding all sets with a non-existent name filter returns an empty array", async () => {
  const sets = await SetRecord.findAll("Non-existent name");
  expect(sets).toBeInstanceOf(Array);
  expect(sets).toHaveLength(0);
});
