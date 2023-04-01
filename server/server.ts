import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { connectDB } from "./database/connections/mainDatabase";
import rateLimit from "express-rate-limit";
import { handleError } from "./errors/error";
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(json());

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per 'window' (here, per 5 minutes)
  })
);

// @TODO routers
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

app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("Listening on http://localhost:3001");
});
